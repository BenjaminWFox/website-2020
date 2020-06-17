---
title: "Creating a React Component Library by Abstracting a React Component Library"
date: "2020-05-17"
subtitle: "Using Rollup, Babel, and React we’ll look at why & how you might abstract a third-party component library to create your own component library."
category: "other"
---

# Creating a React Component Library by Abstracting a React Component Library

Using Rollup, Babel, and React we’ll look at why & how you might abstract a third-party component library to create your own component library.

![](https://cdn-images-1.medium.com/max/3200/1*fOLLMlLkYKS72dBihyBBdQ.png)

Component libraries are useful. They allow developers to add features quickly and with confidence that they will have consistent style & functionality. Libraries may be built in-house or by a third party. The former offers complete control over implementation but takes more time and resources to build; The latter can be implemented quickly, but relies on the existing implementation.

I like third party libraries, and have found that almost any limitations can be overcome by abstracting the library components on the side of the implementing application. When the library to implementing application ratio is 1 to 1, like in personal projects or on a small team, this process is relatively straight forward. With larger or multiple teams, however, where multiple applications are relying on the same underlying library, one-off customizations quickly lead to inconsistent implementations:

![Multiple applications creating different custom implementations from a 3rd party library component.](https://cdn-images-1.medium.com/max/2000/1*WXHkK3ZvQdiqvq-llSMfdw.png)*Multiple applications creating different custom implementations from a 3rd party library component.*

So, what if you want 🎂🍰🥄👄😋? […to have your cake and eat it too!]

Create your own component library…by abstracting an entire component library!

![Multiple applications using the same custom implementation, abstracted from a 3rd party component.](https://cdn-images-1.medium.com/max/2000/1*ZK7tY-q7okG3JRnO6fpREg.png)*Multiple applications using the same custom implementation, abstracted from a 3rd party component.*

When might you want to do this?

* The time/resources/desire to build a library from scratch are not available.

* Parallel design & dev work streams exist where multiple teams/developers need to start building ‘immediately’ with components that can be incrementally updated as style & functionality evolve.

* Extensive customizations to style (think theme/brand) and/or functionality need to be made, AND multiple teams and/or applications need to implement these customizations with consistency.

## Some things to consider before going this route:

* Documentation becomes challenging — The original implementation details live in the original library, but any new functionality needs to be documented in the abstracting library.

* Complexity is added when maintaining an additional service consumed by multiple applications/clients.

* There is a trap in thinking that, because you are abstracting the third-party library, that you might easily swap it for a different one later on. Don’t fall for it! In this scenario, you should be exposing all the underlying props of any abstracted components. As soon as applications start implementing *your *library you’re locked in to your choice.

## A quick definition of Abstraction
> Regarding the word ‘abstract[ion]/[ing]/[ed]’ — I’m going to use it a lot, and essentially what I mean in this context is ‘wrapping’. I’m going to ‘wrap’ a 3rd-party component library with my own component library, specifically by ‘wrapping’ any components from that library with my own components.

## What I’ll Cover

1. [Final Repositories](#884c)

1. [Selecting a 3rd-party library](#0c0e)

1. [Component Library Initial Setup](#50c3)

1. [Installing Rollup](#d3af)

1. [Installing Babel](#6921)

1. [Installing React](#c9fb)

1. [Installing Carbon](#df0d)

1. [Configuring Rollup](#09c0)

1. [Configuring Babel](#13a8)

1. [Adding a Component](#b58f)

1. [Adding a Build Script](#cd92)

1. [Creating a Consumer Application](#5324)

1. [Library: Adding Another Component](#f09b)

1. [Consumer: Adding the Message Component](#fd7f)

1. [Library: Importing Carbon SASS Styles](#dcd6)

## Final Repositories

If you’d like to start with a full picture of the project take a look at the repositories below. This tutorial assumes that the two projects below are in sibling directories while developing.

The final **component-library** is an npm package that imports the Carbon Design System, extends some base Carbon components functionality and style, and re-exports them using Rollup & Babel.

[https://github.com/BenjaminWFox/component-library](https://github.com/BenjaminWFox/component-library)

The **library-consumer** is a basic React application that imports the **component-library **and implements the library components & styles.

[https://github.com/BenjaminWFox/library-consumer](https://github.com/BenjaminWFox/library-consumer)

## Selection of a 3rd-party Library

If you’re going down this route chances are you’re not the only stakeholder whose opinion matters. Depending on your situation there may be additional considerations from design (a full design system, Sketch/Figma support?) or business (license, speed, size, accessibility?) stakeholders.

There are so many component libraries out there that the ‘right’ choice will be one that offers the greatest benefit for any particular needs you may have as a developer, team, or organization.

I’m going to use the React component library from the Carbon Design System by IBM. The design team I work with recently chose it as the foundation for our in-house design system because it offers a relatively straight-forward, opinionated guidance and strong integration support for Figma. It’s got some good things going for it for developers too, including a React component library with first-class* support of the design system, great documentation, and attention to important & often-overlooked details like accessibility.
> * by ‘first-class’ support I mean that the React implementation is a direct subset of the Carbon Design System & maintained in-house. Compare that to Material-UI (full disclosure, I also like MUI and it was a strong 2nd contender), which is a 3rd party implementation of the Material Design System.

## Library: Initial Setup

### Project folder, npm, and git

Now that we know what we’re aiming to build, we can initialize the project. Get it all out of the way at once creating a project folder, an npm package, & git repo with an initial commit:

    mkdir component-library && cd component-library && npm init -y && git init && git add . && git commit -m “initial commit”

Make one change to your `package.json` file:

```diff
- "main": "index.js",
+ "main": "lib/index.js",
```

^ This **main **property is the file any consuming application will use to import from your package. Since the library package is currently called ‘**component-library**,’ when we eventually install the package in a project and try to:

    import { Component } from ‘component-library’

the **lib/index.js** file specified by the **main** property is where that project will look for the import.

### Folder structure & files

You now have a **package.json **file — create some additional folder structure and some files:

    /src
      - /components
        - /button
          - button.js
        - /message
          - message.js
          - message.scss
      - .babelrc
      - index.js
      - carbon.scss
    .gitignore
    rollup.config.js

If you don’t want to create these from scratch & you’re on a *nix shell, you can try the following command. Sorry Windows users, I don’t have a machine to translate on 😕

    touch .gitignore && touch rollup.config.js && mkdir src && cd src && touch .babelrc && touch index.js && touch carbon.scss && mkdir components && cd components && mkdir button && touch button/button.js && mkdir message && touch message/message.js && touch message/message.scss && cd ../../

For the first file update, open the **.gitignore** file and add:

<iframe src="https://medium.com/media/3500c7685d109e05e15e9359c68da3ad" frameborder=0></iframe>

^ the **node_modules **folder is not something we want to check in to git. We’ll fill in the rest of the file contents after we add additional packages. Don’t forget to commit the changes:

    git add . && git commit -m “Add initial folder & file structure”

## Library: Install Rollup

The first packages to add are for Rollup, a JavaScript module bundler like Webpack. The research I did before implementing this boiled down to “use Webpack for applications and Rollup for libraries” … so that’s what I did 🤷‍♂️

    npm install --save-dev rollup @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-peer-deps-external rollup-plugin-postcss node-sass autoprefixer

How someone builds something like this off the top of their head and knows exactly what plugins to use without hours of research is beyond me 🤯

I used two separate articles for the basis of this library, but both were out of date enough that the plugin names had since been updated. I won’t claim to understand in-depth what all the plugins do. Besides rollup, we’re using:

* @rollup/plugin-babel: [Easier integration of Babel w/ Rollup](https://github.com/rollup/plugins/blob/master/packages/babel)

* @rollup/plugin-commonjs: [Converts CommonJS modules to ES6](https://github.com/rollup/plugins/blob/master/packages/commonjs)

* @rollup/plugin-node-resolve: [“Locates modules using the Node resolution algorithm,”](https://github.com/rollup/plugins/tree/master/packages/node-resolve) which I’m assuming is better than the rollup default 🤔

* rollup-plugin-peer-deps-external: [Used to avoid some extra keystrokes needed to specify peer dependency exclusions in **rollup.config.js](https://github.com/pmowrer/rollup-plugin-peer-deps-external#readme)**

* rollup-plugin-postcss: [Used to compile & export the SASS/C](https://github.com/egoist/rollup-plugin-postcss)SS — it will also leverage two additional plugins: [node-sass](https://github.com/sass/node-sass) & [autoprefixer](https://github.com/postcss/autoprefixer#readme)

## Library: Install Babel

Next up is Babel, which will transform the code we write to ensure backwards compatibility.

    npm install --save-dev @babel/cli @babel/core @babel/preset-env @babel/preset-react

[The first three packages (cli, core, and preset-env)](https://babeljs.io/docs/en/next/usage) are the basics required for using Babel. [The last (preset-react) package](https://babeljs.io/docs/en/babel-preset-react) will add support for React & JSX specific syntax.

## Library: Install React

It’s a React library, so this next one is pretty straight froward…

    npm install react react-dom

…or so you thought! Since this *is* a React library we can reasonably expect any consuming application to *also* have React installed. To avoid bundling the entirety of React with our package, we can add **react** and **react-dom** to the **peerDependencies** in package.json as shown below. It’s the same format as dependencies/devDependencies. Make sure you use your current version of React if the gist is out of date:

<iframe src="https://medium.com/media/c261ea39e62dc4ac9da7c153a8b9991c" frameborder=0></iframe>

## Library: Install Carbon

The [Carbon component library for React](https://www.carbondesignsystem.com/get-started/develop/react) is pretty easy to get started with:

    npm install carbon-components carbon-components-react carbon-icons @carbon/icons-react

Contrary to React, we *don’t* want our consuming application to have Carbon installed, so these will not be added to peerDependencies.

Commit all these new changes:

    git add . && git commit -m “Install necessary packages”

## Library: Configure Rollup

Add the configuration below to the **rollup.config.js** file. This is by far the most complex part of creating a component library, with the largest challenge, I though, being how to configure the plugin to compile & bundle the SASS. I originally tried a different plugin, [rollup-plugin-sass](https://www.npmjs.com/package/rollup-plugin-sass), but it didn’t seem to be quite as flexible.

If you’ve used Webpack the functionality should be somewhat familiar. When we build the package with this config, Rollup will:

1. Start processing from the file referenced at `input`

1. Process the code through the plugins — as far as I can tell [plugins are run in order](https://github.com/rollup/rollup/issues/996#issuecomment-250170150), but I can’t find that noted explicitly in documentation.

1. Write the final code to the path/file referenced at `output`

<iframe src="https://medium.com/media/a640a9eb68428dafcbdf59d7353fddd6" frameborder=0></iframe>

## Library: Configure Babel

Add the configuration below to the **src/.babelrc** file to ensure babel is using the presets we installed:

<iframe src="https://medium.com/media/32aa467fc3db369906ced2c165c596bf" frameborder=0></iframe>

## Library: Add a component to test

Now, in theory, if we add a component we should be able to build with Rollup and get a bundle we can reference from another project!

Add the following to **src/components/button.js** — this will give us an end-to-end example of importing from Carbon, abstracting the Carbon component and adding an additional prop, then re-exporting it.

<iframe src="https://medium.com/media/28101af7be73193dfbb13eaa88803241" frameborder=0></iframe>

Then add a little code to **src/index.js** to import and re-export the Button component.

<iframe src="https://medium.com/media/ff9fece5711a78f17ef32713b79318f5" frameborder=0></iframe>

^ Per our **rollup.config.js**, **src/index.js** will be build into **lib/index.js** which will allow any application using our library to import components in the format:

    import { Component } from ‘component-library’

## Library: Add a Build Script

We could call rollup straight from the command line, but best practice is to add the scripts we need to **package.json**. In addition to the **build **script, add a **watch** script that will rebuild on any changes during development. Add the following **watch **and** build **scripts to **package.json**:

<iframe src="https://medium.com/media/b6ba69495e0fe038f9719f9b7b7a4de9" frameborder=0></iframe>

Then, try it out:

    npm run build
    # or try `npm run watch` to auto-build as you keep making changes

…and if it worked, you should see something in the console like:

    src/index.js → lib/index.js…
    (!) Circular dependencies
    [...circular dependency stuff that we don't need to worry about]
    created lib/index.js in 3.7s

…and you’ll also have a new directory, **lib/** with two files, **index.js** & **index.map.js**. If you don’t have a **lib/ **folder, make sure you [updated the **main** prop in **package.json](#50c3)**.

## Consumer: Setup & Consumption

So far so good! We have a component library package that builds and (in theory) should be exporting our Carbon button abstraction. How do we test that the build really worked & the export can be used in another application? Create a basic application, then let’s import it — this script assumes that you’re running it from **within the component-library directory**:

    cd .. && npx create-react-app library-consumer && cd library-consumer && npm install ../component-library

^ This one-liner, besides running create-react-app, will install your local package in the sibling directory (**../component-library**). If you were developing against an already published package, you could accomplish the same thing with the **npm link** command (some good resources [here](https://medium.com/@AidThompsin/how-to-npm-link-to-a-local-version-of-your-dependency-84e82126667a) and [here](https://www.deadcoderising.com/how-to-smoothly-develop-node-modules-locally-using-npm-link/)), but that’s more complex than is needed for right now.

That command might take a couple minutes to complete. When it’s done, open up **src/App.js** in the newly created Create React App (CRA) project, and edit it to look like this:

<iframe src="https://medium.com/media/50ead410f34e6b665c81fecc72f15e98" frameborder=0></iframe>

Now, (still from the **library-consumer** folder) run the CRA project:

    npm run start

…and you should see the button with “Hello World”!

### At this point you’ve successfully abstracted a react component library to build your very own react component library!

## 🎉 🎂 😋

## Library: Add Another Component

We’ve seen now how to create a component that wraps a Carbon component. Let’s create another component, this time without using Carbon. As a bonus, we’ll add some styles.

Switch back to the **component-library** project and add a component to **src/components/message/message.js**:

<iframe src="https://medium.com/media/6c48f9c5ce613baaaca5b8ad66d7eec8" frameborder=0></iframe>

… and add a class to **src/components/message/message.scss:**

<iframe src="https://medium.com/media/621799976a985ad47d3bb848a424412e" frameborder=0></iframe>

.. and then import & export it from **src/index.js**:

<iframe src="https://medium.com/media/e95aecc5fe032ee84532ed8f222ebc60" frameborder=0></iframe>

… and that’s it! Since you’ve already set up the SASS processing in **rollup.config.js**, when you import a **.scss** file it will be automatically processed & build into a final bundle.

Make sure you build the library again if you’re not running the watch command:

    npm run build

## Consumer: Add the Message Component

Back in the **library-consumer** application, in **src/App.js**, make the following changes to import the **Message **component and styles from our **index.css** file. (If you wanted, you could include these in the App.css file instead with: *@import ‘../node_modules/component-library/lib/index.css’;*):

<iframe src="https://medium.com/media/d92c79a4e0141d03c9aa71cf8c9e47e1" frameborder=0></iframe>

## ⚠️ This will probably give you an error ⚠️

Just get an error about hooks?
> This problem can also come up when you use *npm link* or an equivalent. In that case, your bundler might “see” two Reacts — one in application folder and one in your library folder. Assuming *myapp* and *mylib* are sibling folders, one possible fix is to run *npm link ../myapp/node_modules/react* from *mylib*. This should make the library use the application’s React copy.
> - [https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)

This is a known issue when using a component with hooks from a **linked **(npm link) component library. You may remember that we didn’t actually use **npm link**, but installing the library via path like **npm install ../component-library** does essentially the same thing.

Run this (make sure it’s run **from** the **component-library** directory):

    npm link ../library-consumer/node_modules/react

Then rebuild the library:

    npm run build

Then switch back to the **library-consumer **application and restart the application.

    npm run start

❗️If the above doesn’t work, try deleting your **node_modules** folders in both projects️ and re-running **npm install** prior to running this series of commands. I had some varying results when I was testing.

## Library: Importing Carbon SASS Styles

Right now the Button component looks pretty plain. The Carbon library uses SASS for styling, and those styles are separate from the components. Applying the styles (like for the Button) will require importing them explicitly.

The most performant option (for build time & package size) would be to import component files one at a time from Carbon library in **node_modules/ **as needed, but for this example I’m going to [import all the Carbon styles at once](https://www.carbondesignsystem.com/tutorial/react/step-1#import-carbon-component-styles). Add this import line to the **src/carbon.scss **file:

<iframe src="https://medium.com/media/46a0787ef68822ee2467cbe60a7f2128" frameborder=0></iframe>

… and then import the styles in **src/index.js:**

<iframe src="https://medium.com/media/e3074d2ab97199c5c14852e4295822c7" frameborder=0></iframe>

… and since we already have our **index.css **file imported in the **library-consumer** application, you should see now (**or when you rebuild the component-library**) that the layout has changed and the button is big and blue.

## And that’s about it

Nice work! If you got this far you’ve built a fully-functional React component library with access to all of the Styles and React components from the Carbon design system!

## Questions? Comments?

Find me on twitter — [@BenjaminWFox](https://twitter.com/BenjaminWFox)
