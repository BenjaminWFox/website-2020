---
title: "Why isn't the npm link command working?"
date: "2021-04-06"
subtitle: "I don't know, this thing's complicated! Understanding more about what's going on under the hood and looking at some common issues may help."
category: "tech"
image: "images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-meta-image.jpg"
---

![A row of eleven red leaves evenly torn in half down the middle](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

This article is for anyone who has struggled (or is struggling) to get to projects connected via `npm link`. It's also for myself, so that I have one place to refer back to all the notes I've made in various places when was trying to get it to work for one project or another.

## Table of Contents <!-- omit in toc -->
1. [What is npm link](#what-is-npm-link)
2. [What does npm link do](#what-does-npm-link-do)
   1. [The commands](#the-commands)
   2. [Under the hood](#under-the-hood)
3. [If you use NVM...](#if-you-use-nvm)
4. [If you use React...](#if-you-use-react)
5. [To Undo Linking](#to-undo-linking)
6. [TL;DR - things to check](#tldr---things-to-check)
7. [Flowchart Graphic](#flowchart-graphic)

## [What is npm link](#what-is-npm-link)

`npm link` [is an npm command](https://docs.npmjs.com/cli/v7/commands/npm-link) which, when used correctly, creates a link between two packages to facilitate development in a local environment. This allows you to reference the local package (instead of the npm-hosted package) without creating modifications to your `package.json` file. For instance, with the following folder structure, you could reference you package explicitly via path, or implicitly via npm link.

In this case, I'm using **explicit** to mean "obvious to see there is a linked package" and **implicit** to mean "not obvious there is a linked package":

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

## [What does npm link do](#what-does-npm-link-do)

I've found it important to understand exactly what is happening under the hood, because it seems like 60% of the time I fail to link packages correctly 100% of the time. The documentation for the command does a decent job of explaining things at a high level, but it also contains some jargon which threw me off at first.

### [The commands](#the-commands)

At the most basic, `npm link` is a two step process:
1. Run `npm link` in the ***package*** directory
2. Run `npm link my-package` in the ***project*** directory

If two steps is too many, you can make this a one-step process using a shorthand command, and npm will combine the two commands above:
1. Run `npm link ../my-package` in the ***project*** directory

### [Under the hood](#under-the-hood)

Running `npm link` creates a symlink (or 'symbolic link') *from* your global `node_modules` folder *to* the package directory (where the command was run). This means that, after running the command, if you were to try and install a package directly from that global folder (like `npm link /usr/local/lib/node_modules/my-package`) your install would be pointing to the package directory itself.

You can find this global folder by looking up your [global prefix](https://docs.npmjs.com/cli/v7/commands/npm-prefix) with `npm prefix -g`, and from there drilling down into `/lib/node_modules/`.

⚠️ note that your global `node_modules` folder may not be where you think it is ([like if you use NVM](#if-you-use-nvm)). Pay close attention to the output you get after running the commands above. From left to right, it's telling you where the simlink was created, and where it's pointing:

`npm link`:  
`/Users/username/.nvm/versions/node/v12.19.0/lib/node_modules/my-package -> /Users/username/Documents/Projects/my-package`

**^** you see the symlink created in the global `node_modules/my-package` folder, pointing to the `my-package` directory.

The same goes for the next command, where you'd get something like this:

`npm link my-package`:  
`/Users/username/Documents/Projects/my-project/node_modules/my-package -> /Users/username/.nvm/versions/node/v12.19.0/lib/node_modules/my-package`

**^** you see another symlink created in the `my-project` folder `node_modules/my-package`, pointing to the global `node_modules/my-package` folder (which itself points to the `my-pacakge` directory).

## [If you use NVM...](#if-you-use-nvm)

[Node Version Manager](https://github.com/nvm-sh/nvm) is a handy "...version manager for node.js, designed to be installed per-user, and invoked per-shell."

However by default nvm creates a different, global `node_modules` folder for ***every*** version of node you have installed.

If you have multiple node versions installed and switch between them you may wind up with linked packages where you aren't expecting.

## [If you use React...](#if-you-use-react)

If both your project & package use React (as `dependencies` or `devDependencies` in `package.json`), you may encounter an error after linking:

> Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
> ...

This is due to now having react included from both your project and package. In this case, the solution that most commonly works for me is to reference the **project** React version from the **package**:

`../my-package> npm link ../my-project/node_modules/react`

This may not always be the solution, and you may have to consult [the docs](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react), [GitHub Issues](https://github.com/facebook/react/issues/13991), or [StackOverflow](https://stackoverflow.com/questions/64283813/invalid-hook-call-on-npm-link-library).

## [To Undo Linking](#to-undo-linking)

In both your **project** and **package** directories run `npm unlink` followed by `npm install`.

## [TL;DR - things to check](#tldr---things-to-check)

- You ran the correct commands in the correct order:
  - `npm link` in the **package** directory
  - `npm link my-package` in the **project** directory
- If you're using the shorthand command, did you run it from the **project** (not package) directory?
- After running those commands, did you confirm that the global `node_modules` folder listed was the same?
- Did you check that `my-package` does indeed exist in the global `node_modules` folder?

## [Flowchart Graphic](#flowchart-of-what-happens)

Here's a graphical representation of what happens at each step, broken down 

![Graphical depiction of npm link functionality](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-flowchart.png)