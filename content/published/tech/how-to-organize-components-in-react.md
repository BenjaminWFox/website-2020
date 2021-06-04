---
title: "How to Organize Components in React"
date: "2021-06-04"
subtitle: "A highly opinionated set of rules, based on Atomic Design principles, to make sure your components stay organized."
category: "tech"
image: 'images/blog/tech/how-to-organize-components-in-react/confused-penguins.jpg'
---

![Confused Penguins. Where did the component go?!](/public/images/blog/tech/how-to-organize-components-in-react/confused-penguins.jpg)

This is a quick reference guide to the rules I use for organizing components when building a React application. I have found that having a well-defined system helps not only with organization, but also helps better identify how components fit together and maximize reusability across the codebase.

[Definitely check out the extended version of this article](/blog/tech/atomic-design-for-developers) if you're interested in example code, a sample repository, and more information on Atomic Design.

### Contents

1. [Application Structure](#application-structure)
1. [Rules of Atoms](#rules-of-atoms)
1. [Rules of Molecules](#rules-of-molecules)
1. [Rules of Organisms](#rules-of-organisms)
1. [Rules of Templates](#rules-of-templates)
1. [Rules of Pages](#rules-of-pages)
1. [Rules of Routes](#rules-of-routes)

## [Application Structure](#application-structure)

When I initially create a React application, I put all code in a `/src` folder. The `/src/components` folder holds all React components segmented into the five Atomic Design categories: Atoms, Molecules, Organisms, Templates, and Pages. Conveniently, these are already in alphabetical order from smallest conceptual element to the largest!

The `/routes` folder (which may be named differently, as in Next.js where it would *also* be named `pages`) I would recommend keeping it separate from `/components/pages` in order to separate page UI code from application routing code.

```text
/..
--/node_modules
--/public
--/src
--|-/components
--|-|-/atoms
--|-|-/molecules
--|-|-/organisms
--|-|-/templates
--|-|-/pages
--|-/routes
--|-/styles
--|-/utility
--|-/etc...
```

***Without further ado, how to decide which components get put where 🤔***

## [Rules of Atoms](#rules-of-atoms)
The **atom** is the most basic component, as generic as can be. Think buttons, inputs, or formatted title text:

- It should not compose other components/only uses [native elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or framework-specific components similar to native elements
- Can have its own markup & styles 
- Can maintain its own internal state
- Should not be tightly coupled to specific UI or Logic areas
- Should not access application (or higher level) state directly
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## [Rules of Molecules](#rules-of-molecules)
The **molecule** composes atoms to create a more complex component, with its own markup and styling added to the mix. Very similar to atoms but think something like reusable piece of a form with input, label, and error validation messaging, or a product card with title, subtitle, and image:

- It is made up of one or more Atoms
- Can have its own markup & styles
- Can maintain its own internal state
- Should not be tightly coupled to specific UI or Logic areas
- Should not access application (or higher level) state directly
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## [Rules of Organisms](#rules-of-organisms)
The **organism** is where the business logic of your application starts to come out. They might correspond to a specific feature or section of the app. They may also be generally applicable but tightly coupled with the application logic. Data fetching and reading/writing to application state should primarily happen here (or alternatively at the Page level). This could be like an entire form, or part of a shopping card, or a users profile:

- It is more complex, made up of multiple atoms and/or molecules and/or other organisms
- Can have its own markup & styles
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state
- Can be tightly coupled with a specific area (UI and/or Logic) of the app
- Can be organized into sub-folders by logical categorization (feature, page, etc...)

## [Rules of Templates](#rules-of-templates)
A **template** is a way to ensure that the Pages of your app are consistent. They handle creating the layout, and make it easy to know where specific areas of content or functionality need to go. There are a number of ways to create templates. I prefer having a single component that takes other components a props, and slots those prop-children into layout-specific markup:

- It facilitates the layout of multiple organisms
- Can have its own markup & styles.
- Can accept & pass props as required.
- Should not access application (or higher level) state
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## [Rules of Pages](#rules-of-pages)
The **pages** are the last piece of the Atomic Design puzzle, and each one will implement a specific Template. I prefer very simple Page components, but they can be more complex if you prefer simple Routes ([see next section](#rules-of-routes)). At the most basic, the page just implements a template, assigning the correct children to the correct template props:

- It implements a particular template
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state
- Should not have its own markup & styles

## [Rules of Routes](#rules-of-routes)
Finally **routes**, while not part of Atomic Design per-se, are still important to think about in React. Besides handling the routing for your website, routes can take on any of the responsibilities that pages *may* choose not to implement. One or the other of the Page or Route component should be relatively simple, and the other one should handle any complexity from data fetching, business logic, application state, and so on.

- It should handle things that are not handled by pages
- Can fetch application-specific data (if not done in Pages)
- Can implement application-specific business logic (if not done in Pages)
- Can be connected to application (or higher level) state (if not done in Pages)
- Should not have any UI-specific components
- Should not have its own markup & styles

## Additional Detail <!-- omit in toc -->

Again, if you want a more in depth look at how this works in practice, [read this next](/blog/tech/atomic-design-for-developers)!

## Questions? Comments? <!-- omit in toc -->

Follow me on Twitter [@BenjaminWFox](https://twitter.com/BenjaminWFox) for more tech, leadership, and other content and reach out with any thoughts or questions!
