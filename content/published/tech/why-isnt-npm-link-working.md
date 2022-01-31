---
title: "Why isn't the npm link command working?"
date: "2021-04-06"
update: "2022-01-30"
subtitle: "I don't know, this thing's complicated! Understanding more about what's going on under the hood and looking at some common issues may help."
category: "tech"
image: "images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-meta-image.jpg"
---

![A row of eleven red leaves evenly torn in half down the middle](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

This article is for anyone testing npm packages locally and who has struggled (or is struggling) to get to projects connected via `npm link`. It's also for myself, so that I have one place to refer back to all the notes I've made in various places when was trying to get it to work for one project or another.

[Jump straight down to the TL;DR](#tldr---things-to-check) if you'd like a quick troubleshooting checklist. Otherwise read on for a little deeper dive into the `npm link` command.

## Table of Contents <!-- omit in toc -->
1. [Definitions and an Example](#definitions-and-an-example)
1. [What Is npm link](#what-is-npm-link)
1. [What Does npm link Do](#what-does-npm-link-do)
   1. [The Commands](#the-commands)
   1. [Under the Hood](#under-the-hood)
1. [If You Use NVM...](#if-you-use-nvm)
1. [If You Use React...](#if-you-use-react)
1. [To Undo Linking](#to-undo-linking)
1. [TL;DR - Things to Check](#tldr---things-to-check)
1. [Flowchart Graphic](#flowchart-graphic)

## [Definitions and an Example](#definitions-and-an-example)

There are three terms I'll be using a lot, since linking packages is essentially just creating pointers between these three locations on your system:

- *my-package*: a made up name for the npm package under development that is installed in other projects.
- *my-project*: a made up name for the project where *my-package* is installed and tested during local development.
- *global node_modules*: the folder where symlinks are created when running `npm link`, or where packages are added with `npm install -g <package>`.
  - You may have more than one of these, but you can always find the currently configured [global prefix](https://docs.npmjs.com/cli/v7/commands/npm-prefix) with the command `npm prefix -g`. Packages are installed at `<prefix>/lib/node_modules`.

For example, consider the case where *my-project* is an end-user finance application, and *my-package* implements a lot of common finance-related calculations. I want to make some updates to *my-package* but I don't want to have to re-publish it to test every change, and I want to ensure that the changes work as expected in projects where *my-package* is installed. Enter `npm link`.

## [What Is npm link](#what-is-npm-link)

`npm link` [is an npm command](https://docs.npmjs.com/cli/v7/commands/npm-link) which, when used correctly, creates a link between projects to facilitate development in a local environment. This allows you to reference *my-package* locally (instead of the npm-hosted package) without modifying `package.json` in *my-project*. As an example, with the following folder structure, you could reference the package explicitly via path, but this creates problems if you go to deploy *my-project* without reverting `package.json`. The better option is to reference *my-package* implicitly via npm link.

> In this case, I'm using **explicit** to mean "obvious to see there is a linked package" and **implicit** to mean "not obvious there is a linked package":

```text
# Folders:
- Projects
  - my-project
  - my-package

# Explicit reference:
../MyProject> npm install ../my-package

# The explicit reference in package.json looks like:
"MyPackage": "file:../my-package",

# Implicit reference:
../my-project> npm link ../my-package

# The implicit reference in package.json
# doesn't look different than a normal install:
"MyPackage": "^2.0.5",
```

## [What Does npm link Do](#what-does-npm-link-do)

It's helped me a lot to understand exactly what is happening under the hood, because around 60% of the time when I tried to link packages I failed 100% of the time. The documentation for the command does a decent job of explaining things at a high level, but it also contains some jargon which threw me off at first.

### [The Commands](#the-commands)

At the most basic, `npm link` is a two step process:
1. Run `npm link` in the *my-package* directory
2. Run `npm link my-package` in the *my-project* directory

If two steps is too many, you can make this a one-step process using a shorthand command, and npm will combine the two commands above:
1. Run `npm link ../my-package` in the *my-project* directory

### [Under the Hood](#under-the-hood)

Running `npm link` creates a symlink (or 'symbolic link') from your *global node_modules* folder to the *my-package* directory (where the command was run).

⚠️ note that your *global node_modules* folder may not be where you think it is ([like if you use NVM](#if-you-use-nvm)). Pay close attention to the output you get after running the commands above. From left to right, it's telling you where the simlink was created, and where it's pointing:

`npm link`:  
`/Users/username/.nvm/versions/node/v12.19.0/lib/node_modules/my-package -> /Users/username/Documents/Projects/my-package`

**^** you see the symlink to *my-package* created in the *global node_modules* folder, and it's pointing to the *my-package* directory.

The same goes for the next command, where you'd get something like this:

`npm link my-package`:  
`/Users/username/Documents/Projects/my-project/node_modules/my-package -> /Users/username/.nvm/versions/node/v12.19.0/lib/node_modules/my-package`

**^** you see another symlink for *my-package* created in the *my-project* node_modules folder, and it's pointing to the *global node_modules* symlink for *my-package*.

## [If You Use NVM...](#if-you-use-nvm)

[Node Version Manager](https://github.com/nvm-sh/nvm) is a handy "...version manager for node.js, designed to be installed per-user, and invoked per-shell."

However by default nvm creates a different, *global node_modules* folder for every version of node you have installed.

If you have multiple node versions installed and switch between them you may wind up with linked packages where you aren't expecting.

## [If You Use React...](#if-you-use-react)

If both your project & package use React (as `dependencies` or `devDependencies` in `package.json`), you may encounter an error after linking:

> Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
> ...

This is due to now having react included from both your project and package. In this case, the solution that most commonly works for me is to reference the *my-project* React version from *my-package*:

`../my-package> npm link ../my-project/node_modules/react`

This may not always be the solution, and you may have to consult [the docs](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react), [GitHub Issues](https://github.com/facebook/react/issues/13991), or [StackOverflow](https://stackoverflow.com/questions/64283813/invalid-hook-call-on-npm-link-library).

## [To Undo Linking](#to-undo-linking)

In both your *my-project* and *my-package* directories run `npm unlink` followed by `npm install`.

## [TL;DR - Things to Check](#tldr---things-to-check)

- You ran the correct commands in the correct order:
  - `npm link` in the *my-package* directory
  - `npm link my-package` in the *my-project* directory
- If you're using the shorthand command, did you run it from the *my-project* (not package) directory? (see [The Commands](#the-commands))
- After running those commands, did you confirm that the *global node_modules* folder listed was the same? (see [Under The Hood](#under-the-hood))
- Did you check that *my-package* does indeed exist in the *global node_modules* folder?
- When all else fails and I realize I'm repetedly rerunning `npm link` frantically in each directory hoping something starts working I will try to clean up & start over in both project & package directories:
  -  `npm unlink && rm -rf node_modules && npm install`
  -  You might also clear out the *global node_modules* folder, because at this point why not.

## [Flowchart Graphic](#flowchart-of-what-happens)

Here's a graphical representation of what happens at each step, broken down, just another way of looking at what's happening [under the hood](#under-the-hood) that also includes the fix for the [react invalid hook call](#if-you-use-react):

![Graphical depiction of npm link functionality](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-flowchart.jpg)

## Complete! <!-- omit in toc -->

I hope that worked, or at least helped. If you have a different solution or information that's missing here I'd love to hear about it!

## Questions? Comments? <!-- omit in toc -->

Find me on twitter — [@BenjaminWFox](https://twitter.com/BenjaminWFox)
