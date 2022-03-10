---
title: "Next.js Setup | ESLint Jest React Testing Library and Absolute Imports"
date: "2020-05-29"
update: "2022-03-08"
subtitle: "A comprehensive step-by-step guide to configuring Jest, React Testing Library, ESLint, and Absolute Path Aliases in a Next.js project."
category: "tech"
canon: 'https://medium.com/@benjaminwfox/next-js-setup-config-for-testing-linting-and-absolute-imports-605959d7bd6f'
image: 'images/blog/tech/nextjs-setup-config-testing-linting/nextjs-configuration-construction-meta-image.jpg'
---

![Seven almost identical buildings under construction in a row](/public/images/blog/tech/nextjs-setup-config-testing-linting/nextjs-configuration-construction-title-image.jpg)

**Update: 03/08/22:** Next.js 12 is virtually identical in terms of getting things set up. I've made a couple updates here including the use of the `src` directory, and a few minor changes to the ESLint ruleset and the Jest/React Testing Library based on my updated preferences and new best practices. Also no more need for an explicit `.babelrc` file!

**Update: 06/28/21:** Next.js 11 has some improvements when it comes to adding and using ESLint in a project, including some Next-specific linting rules. Some changes have been made to the original article based on the assumption that anyone reading new is going to be starting from Next.js v11+ rather than a previous version.

**Next.js is amazing** when it comes to installing, learning the framework, and jumping into the code. Its superb documentation & zero-config philosophy make this possible, and not having to think about configuration is wonderful…right up to the point when you want to add some additional configuration.

The configuration I want to add is, technically speaking, useless to your final product. It won’t make it faster, or reduce your bundle size, or add amazing new features.

How’s that for a hook…🙄

But it’s important 🤩 Consider this step the first reminder to [go slow to go fast](https://www.infoq.com/articles/slow-down-go-faster/) (esp. check the second to last paragraph). If you need more convincing, remember when Facebook changed its motto to ‘[move fast with stable infra](https://mashable.com/2014/04/30/facebooks-new-mantra-move-fast-with-stability/)’?

You don’t even have to use all of it right away. ESLint and path aliases for absolute imports, once set up, are a free productivity boost. Absolute imports mean no need to worry about how many levels of ../../ are needed to find the component you are trying to import. Linting means no need to worry that a missing ) or } will leave you bashing your head against the wall for 30 minutes wondering why your code doesn’t work.

Jest & React Testing Library, on the other hand, require some effort after setup. Testing your code [is a good habit to have](https://dev.to/restoreddev/why-you-should-be-unit-testing--3k85), and there are some *very* good resources out there to help you [figure out what to test](https://kentcdodds.com/blog/how-to-know-what-to-test).

You may not start testing much right away — particularly if your UI & functional requirements are subject to frequent, drastic changes — but you should test what you can. If you’re not testing at all, you may want to consider evaluating [why you’re putting it off](https://kentcdodds.com/blog/why-youve-been-bad-about-testing). At least now, with this setup ready to go, [you’re more likely to get into the habit](https://lifehacker.com/form-better-habits-by-making-them-more-convenient-1640358351).

## The problem?

Sounds great right? You’ll have stable infrastructure to boost productivity, linting to enforce consistent coding standards, increasing readability and maintainability, and testing to make sure you don’t break stuff 🥳 but getting all of these set up and playing nicely with each other, with Next.js and with your IDE, can be a time consuming exercise in frustration. It’s also WAY less fun than writing code 😩

## The solution?

This is it! Take the time to set it all up once, before writing any project specific code, to create a codebase that can be easily duplicated for any new projects.

Let’s look at what it takes.

### What We’ll Cover

1. [Assumptions](#assumptions)

2. [Final Repository](#final)

3. [Next.js: Installing](#install-nextjs)

4. [ESLint: Install & Configure](#install-eslint)

5. [Jest & React Testing Library: Install, Configure, Implement](#install-configure-jest-testing-library)

6. [Configuring Path Aliases/Absolute Imports](#configure-path-alias)

## [Assumptions](#assumptions)

I’m going to assume you have familiarity running commands in a terminal, and I’m going to use npm commands. None of the commands are anything fancy, so you should be able to [convert to yarn](https://alligator.io/nodejs/npm-yarn-cheatsheet/) if needed.

I’m going to jump right in to adding configuration, and won’t dive in to too much detail on any one item — [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), or [ESLint](https://eslint.org/) —but I will try to give at least some high-level context for what’s happening at each step.

I’m not going to talk about IDE-specific integrations or setup. I’m using VSCode, and I’ll mention it in a few places. Other IDEs should have similar options, but likely require other specific setup steps. If you run into IDE specific issues let me know and I can see about adding additional notes.

### A note before we start

Some of the configuration files we create ([jest.config.js](https://jestjs.io/docs/en/configuration) [.eslintrc](https://eslint.org/docs/user-guide/configuring) can be included within package.json rather than using separate files, if that feels cleaner to you. That will require additional wrapping syntax, which you can find at their respective links. The jsconfig.json & jest.setup.js files will have to be separate.

## [Final Repository](#final)

[https://github.com/BenjaminWFox/nextjs-base](https://github.com/BenjaminWFox/nextjs-base)

## [Next.js: Installing](#install-nextjs)

To start, in your terminal of choice, cd into a folder where you want to install this project. A new subfolder will be created be after you run the setup:

    npm init next-app

Give your project a name like "nextjs-base" (this will also be the folder name). Once the install completes, cd nextjs-base into your project folder.

Now, [for better organization](https://nextjs.org/docs/advanced-features/src-directory), create a new folder called `src` and then move the `pages` and `styles` folders into `src`. Your project should look like this:

```text
.next/
node_modules/
public/
src/
 - pages/
  - api/
 - styles/
.eslint.json
.gitignore
next.config.js
package-lock.json
package.json
README.md
```

## [ESLint: Install & Configure](#install-eslint)

For configuration, let’s start with eslint — that’ll ensure that any future code we write is linted right away and we don’t need to go back and make edits. This will also include a plugin for specifically linting React, and another for linting import/export statements. You'll already have `eslint` and `eslint-config-next` - so let's add two more:

    npm i -D eslint-plugin-react eslint-plugin-import

While that’s running, open up the `.eslintrc.json` file that is at the root of your site. Replace the contents with the configuration below.

Note that [there are a ton of options for configuring ESLint](https://eslint.org/docs/user-guide/configuring).

You ***can*** just extend `next` and `next/core-web-vitals` if you want, leaving out the others. If you do, you can also omit the everything in the `rules` property. Personally, I like the extra structure and what's there feel to me like a good default baseline. A number of the `react/` specific rules are disabled to prevent conflicts with the default `next-app` code style.

If you're working anyone else I'd highly recommend leaving the rules in place, it goes a long way towards keeping a codebase stylistically consistent:

```json
{
  "extends": [
    "next",
    "next/core-web-vitals",
    "eslint:all",
    "plugin:react/all",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "env": {
    "browser": true,
    "es2020": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "func-style": 0,
    "max-len": 0,
    "no-magic-numbers": 0,
    "max-lines-per-function": 0,
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "function-call-argument-newline": 0,
    "padded-blocks": 0,
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": "*", "next": "return" },
      { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*"},
      { "blankLine": "any",    "prev": ["const", "let", "var"], "next": ["const", "let", "var"]}
    ],
    "object-curly-spacing": ["error", "always"],
    "one-var": ["error", "never"],
    "quote-props": 0,
    "react/prop-types": 0,
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-no-literals": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-max-depth": 0,
    "react/jsx-newline": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-max-props-per-line": ["error", {"maximum": {"single": 3, "multi": 1}}]
  },
  "ignorePatterns": [
    "node_modules/",
    ".next/"
  ]
}
```

^ some breakdown of what this is doing:

* [extends](https://eslint.org/docs/2.0.0/user-guide/configuring#extending-configuration-files) sets up a set of base rules to use as a starting point. Using **all** is probably going to make your life harder…but I would recommend keeping it, and adding specific modifications to rules you don’t like. It will give you a good sense of the different ways people might format code. There are all kinds of base configs you could extend instead, from companies ([airbnb](https://www.npmjs.com/package/eslint-config-airbnb), [facebook](https://www.npmjs.com/package/eslint-config-fbjs)) and projects ([standard](https://www.npmjs.com/package/eslint-config-standard), [prettier](https://www.npmjs.com/package/eslint-config-prettier)).

* [env](https://eslint.org/docs/2.0.0/user-guide/configuring#specifying-environments) tells ESLint what global variables & special syntax to expect. Since this is for Next.js, we’re adding the **browser** and **node**. The **es2020** (which is ecmaVersion 11 (which basically means JavaScript version 11)) allows for using newer JavaScript syntax, and **jest** is for global variables used when writing tests.

* [parserOptions](https://eslint.org/docs/2.0.0/user-guide/configuring#specifying-parser-options) is specifically for allowing additional JavaScript language features. **sourceType** will prevent errors from import syntax, and **ecmaFeatures** allows for additional features outside the standard ecma syntax.

* [rules](https://eslint.org/docs/2.0.0/user-guide/configuring#configuring-rules) is where you can configure the linting behavior to your liking. Any that are prefixed with react/ are [specific to the ESLint react plugin](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules), similarly import/ would prefix any [rules for the import plugin](https://github.com/benmosher/eslint-plugin-import#rules) — we just don’t need to add any here. Otherwise they are [standard ESLint rules](https://eslint.org/docs/rules/).

* [ignorePatterns](https://eslint.org/docs/user-guide/configuring#ignorepatterns-in-config-files) lets you define specific files, folders, or patterns to exclude from linting. Both the **node_modules** and **.next** folders are actually excluded be default, and added here only as examples.

So…that’s a lot! But it will let us lint the Next.js project we have now with the --fix flag enabled to automatically format our code (next step!).

### Add & Run the Lint Script

Now add one new script to your **package.json** file under the start script:

```json
    "start": "next start",
    "lint": "next lint",
    "lint.fix": "next lint --fix"
```

**^** Don’t forget the , (comma) at the end of the `"lint"` line! If you've integrated your IDE with ESLint you’ll already have seen a bunch of errors if you open **src/pages/index.js.** The **src/pages/api/hello.js** should be error-free!

If you `npm run lint` now, you can also see all the errors in the console. I've tweaked the eslint config over time, so the exact set of errors may be slightly different.

![errors shown from running eslint, mostly about sorting props alphabetically](https://cdn-images-1.medium.com/max/3552/1*aCb1Y6V6IDusI3c6fc7Fmw.png)

…now do npm run lint.fix and you’ll see a number of formatting changes to align the code with the linter rules, and no more errors!

### Two Final Notes on Linting

* Regarding IDE integration if you go that route — it’s super convenient to set it up to lint & fix whenever you save the file.

* Assuming you use this base template in new projects, if you find yourself making updates to the .estlintrc file to accommodate your style preferences, remember to copy those back to the base project!

## [Jest & Testing Library: Install, Configure, Implement](#install-configure-jest-testing-library)

### Install Dependencies

Next up let’s add testing capabilities. Start with the install:

```
npm i -D jest @types/jest @testing-library/react @testing-library/jest-dom
```

^ [jest](https://jestjs.io/) for running the tests & [@types/jest](https://www.npmjs.com/package/@types/jest) to help with IDE auto-complete when writing tests. [@testing-library/react](https://github.com/testing-library/react-testing-library) to render components in the testing environment & test them in a way that tries to mimic how users interact with them. [@testing-library/jest-dom](https://github.com/testing-library/jest-dom#readme) for additional DOM-related [assertions](https://www.tutorialspoint.com/software_testing_dictionary/assertion_testing.htm).

### Create Config Files

Create two new files at the project root for Jest: **jest.config.js** & **jest.setup.js**. Add this content to the **jest.config.js** file:

```javascript
// Jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Jest.config.js
const customConfig = {
  // Automatically clear mock calls and instances between every test
  'clearMocks': true,
  // The directory where Jest should output its coverage files
  'coverageDirectory': '.coverage',
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  'setupFilesAfterEnv': ['./jest.setup.js'],
  // By default jest will use a node environment, so DOM elements (like document) will be undefined without this
  'testEnvironment': 'jsdom'
}

module.exports = createJestConfig(customConfig)
```

^ There are [a huge number of configuration options ](https://jestjs.io/docs/en/configuration)for Jest. This is a very small subset. **clearMocks** can prevent headaches with unintended [persistence of mock data](https://jestjs.io/docs/en/manual-mocks) between tests. **coverageDirectory** is for generating [test coverage](https://jestjs.io/docs/en/cli.html#--coverageboolean), running jest with the --coverage flag. The most important piece here is **setupFilesAfterEnv**, which will run before each test file. Add this to the **jest.setup.js** file:

```
// Jest.setup.js
import '@testing-library/jest-dom'
```

^ This enables access to the additional assertions provided by the[@testing-library/jest-do](https://github.com/testing-library/jest-dom#readme)m package.

### Write a Test File

Create a file **src/page-tests/index.test.js** and add some test code:

```javascript
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

// `describe` is not required, but it helps the tests read nicely
describe('The Home Page Component', () => {
  // Each test for the component will get an `it` block
  it('should have exactly 1 `main` section', () => {
    // The getByRole will error if there are less or more than 1 element found
    render(<Home />)
    const main = screen.getByRole('main')

    expect(main).toBeInTheDocument()
  })
})
```

### Add a Test Script

The last change for Jest is to the **package.json** file; Update it to add a test script under the lint script you added earlier:

```json
"lint.fix": "eslint --fix --ext .js ./",
"test": "jest"
```

Then in the project root in the terminal you can npm run test — and should see it passing!

![](https://cdn-images-1.medium.com/max/3548/1*FlTB0Avl89dbpuz19_Hi4g.png)

## [Configuring Path Aliases/Absolute Imports](#configure-path-alias)

I have seen some debate that leads me to believe path aliases are a love-it or hate-it addition to a codebase. I personally hate having to remember which particular file I’m working in and how many levels it is to import some other component or method…so I love aliasing my import paths. The difference is:

```javascript
// (Default) Relative imports 😈: 
import { Awesome } from '../../components/awesome
import { Method } from '../../../classes/method

// (Aliased) Absolute imports 😇:
import { Awesome } from '@/components/awesome
import { Method } from '@/classes/method
```

^ Note that the syntax I’m using, @/folder/path, is arbitrary — the @ may look fancy but it is only there to make it obvious that this isn’t an npm package or a relative import — you could name the alias paths however you like!

The challenge setting these up is that once you start using them in your application *and* in your tests, *all* the different systems in your code that have to [resolve imports](https://www.typescriptlang.org/docs/handbook/module-resolution.html) (<-- good explanation of resolving modules — ignore the TypeScript parts 😅) need to understand these aliases. For us, that means adding configuration for Next.js, Jest, ESLint, and VSCode 😰 … so a lot of updates to the configuration we’ve done thus far but don’t worry —it’s not *too* drastic.

### Create a Test Component

In order to verify the aliased paths are working we need something to import. Typically you would alias the top-level folders to reference the import path from there, but the only two top-level folders we have currently aren’t really something we need to alias; Anything in pages/ probably shouldn’t be imported anywhere else, and anything in public/ can already be referenced by absolute path in `src` or `href` attributes.

Instead, let’s create a new section in the code specifically for components. This will be two new folders and a file: **src/components/callout/callout.js**. Add this to the **callout.js** file:

```javascript
import PropTypes from 'prop-types'

export default function Callout({ children }) {
  return <p><strong style={{ color: 'red' }}>!</strong> {children} <strong style={{ color: 'red' }}>!</strong></p>
}

Callout.propTypes = {
  children: PropTypes.node.isRequired
}
```

### Try The Component

If you import that component in **src/pages/index.js** via a relative import, you can confirm it’s working:

```javascript
import Callout from '../components/callout/callout'
import Head from 'next/head'
```

Then wrap the component around the “Welcome…” message in the h1 tag:

```javascript
<h1 className={styles.title}>
  <Callout>Welcome to <a href="https://nextjs.org">Next.js!</a></Callout>
</h1>
```

Then npm run dev and see: ❗️️ Welcome to Next.js! ❗️

Now change **src/pages/index.js** to use the aliased absolute import:

```javascript
import Callout from '@/components/callout/callout'
```

![](https://cdn-images-1.medium.com/max/2948/1*qwtcIk5THQuMRMz7pN98zw.png)

…and you should see an error, yay! Let’s fix that!

### Next.js & VSCode

Now that we have a component to test and we can see it’s not working, let’s start the configuration updates. Create a file in the project root named **jsconfig.json**. This will let us [nab two birds with one stone](https://idioms.thefreedictionary.com/kill+two+birds+with+one+stone) since both [VSCode](https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases) and [Next.js](https://nextjs.org/docs/advanced-features/module-path-aliases) use this format for aliases. Add this to the file you just created:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"]
    }
  }
}
```

^ This won’t trigger a HRM refresh, so you’ll have to stop the dev server and npm run dev again, but after that — your component should be up and running again!

In the IDE, if you’ve integrated ESLint, you’ll probably see an error still about how it is “Unable to resolve path to module,” so let’s update ESLint next.

### Update ESLint

The configuration for ESLint will be added to **.eslintrc**, but first we need to install another package:

`npm i -D eslint-import-resolver-alias`

^ this package adds the functionality for ESLint to handle the resolution of aliased paths, which it can’t do by default. Update the **.eslintrc** file by adding the following at the bottom, after the ignorePatterns property:

```json
"ignorePatterns": ["node_modules/", ".next/"],
"settings": {
  "import/resolver": {
    "alias": [
        ["@/components", "./src/components"],
        ["@/classes", "./src/classes"]
    ]
  }
}
```

^ I’ve added an additional entry for a hypothetical **/classes** directory to show the syntax for multiple aliases. The need for each entry to be its own array was not intuitive for me.

If you npm run lint now, there shouldn’t be any module import errors (you may have some spacing/minor issues from copy-pasting, so maybe npm run lint.fix), and the IDE error should have disappeared!

### Update Jest

Finally we need to update Jest. In the file **src/pages/index.test.js** add an import for our Callout component:

```javascript
import Callout from '@/components/callout/callout'
import Home from './index'
import { render } from '@testing-library/react'
...
```

… then try npm run test. You should see an error about the module:

![Cannot find module ‘@/components/callout/callout’ from ‘src/pages/index.test.js’](https://cdn-images-1.medium.com/max/3548/1*sv3BrXwUREHq4qMq5Ku48Q.png)*Cannot find module ‘@/components/callout/callout’ from ‘src/pages/index.test.js’*

The addition to fix this will go into **jest.config.js**, [a property called moduleNameMapper](https://jestjs.io/docs/en/configuration#modulenamemapper-objectstring-string--arraystring) which uses RegEx syntax, so is a bit more complicated:

```javascript
const customConfig = {
  // Automatically clear mock calls and instances between every test
  'clearMocks': true,
  // The directory where Jest should output its coverage files
  'coverageDirectory': '.coverage',
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1'
  },
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  'setupFilesAfterEnv': ['./jest.setup.js'],
  // By default jest will use a node environment, so DOM elements (like document) will be undefined without this
  'testEnvironment': 'jsdom'
}
```

^ The regex is using a [capturing group](https://javascript.info/regexp-groups) to take everything that comes after @/components and resolve it instead from the <rootDir>/components specified on the right. [Check it out on regex101.com](https://regex101.com/r/hD0zR5/6) for a more complete breakdown of what’s going on.

…now try npm run test, error should be gone!

Since we only added it for testing, you can remove the import Callout ... line we added to **src/pages/index.test.js**.

### Important to remember

When you add new aliases in the future, you’ll need to add them to three files:

* **jsconfig.json**

* **.eslintrc**

* **jest.config.js**

## Complete!

Whew, that was a lot 😰 Fantastic job getting through it all, and you now have a robust Next.js base project you can use to build from in the future!

## Questions? Comments?

Find me on twitter — [@BenjaminWFox](https://twitter.com/BenjaminWFox)
