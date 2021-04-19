---
title: "Better App Organization with Atomic Design for Developers"
date: "2021-04-18"
subtitle: "A practical guide to organizing and building component based apps around the Atomic Design methodology."
category: "tech"
---

Organizing your application can seem easy. A folder for components, one for assets, another for utility methods. Maybe even a separate folder for pages! Don't be fooled, it is never that easy. Without a plan, as your app starts to grow, you should have a way to organize things that provides more granular organization, separation and, importantly, is based on explicit rules and guidelines rather than guesswork or instinct.

- [Backstory](#backstory)
- [Atomic Design](#atomic-design)
- [Why this Article](#why-this-article)
  - [My goal is to:](#my-goal-is-to)
  - [Sample Code](#sample-code)
- [Atoms](#atoms)
  - [Examples:](#examples)
  - [Rules of Atoms:](#rules-of-atoms)
- [Molecules](#molecules)
- [Examples:](#examples-1)
  - [Rules:](#rules)
- [Organisms](#organisms)
- [Templates](#templates)
- [Pages](#pages)
- [One Rule to Rule Them All](#one-rule-to-rule-them-all)

## Backstory

A few years back I was searching for a better way to organize components in web apps. The designers I was working with at the time were adopting a design system that followed Atomic Design principles and it seems like that would translate well into the front-end development space since ultimately our work was to implement the components creted by the design team.

Having a common language to use for categorizing components seemed like a no-brainer, although for a variety of reasons unrelated to Atomic Design this didn't end up being the case between our designers and engineers. 

It did work out pretty well for the engineering team internally though so, good news, you don't need to have buy-in and adoption from designers to start using these principles for development!

## Atomic Design

[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design) is a methodology for creating design systems created by [Brad Frost](https://bradfrost.com/). You can read the full post for a comprehensive overview.

For the purposes of this article it's important to know that Atomic Design breaks design systems (and the components that make up an application) into five levels.

It begins by starting at the smallest component level (atoms) and combining those to create larger components (molecules)which themselves get combined into still larger comonents (organisms) which are then dispalyed in logical groups (templates) that make up the the app (pages).

**`Atoms -> Molecules -> Organisms -> Templates -> Pages`**

In this article I'm going to talk about applying Atomic Design principles to front-end app development. I'll be using React for specific examples, but the definitions and principles should apply to any component or composition based UI applications.

## Why this Article

The biggest challenge I faced with my team after deciding to use Atomic Design principles as the basis for our component organization and heirarchy was figuring out what components went into which buckets. There were some other writeups I found that had bits and pieces of details, but I never found anything that gave a prescriptive example of how each level might be delineated or gave examples of implemenation and usage.

When you're building reusable components there are a lot of considerations which include decisions like how it's structured, what data it needs, where that data lives, if (and where) state is needed, and so on. Since you've (hopefully) already made most or all of those decisions before starting the build the component, you can use them as a set of heuristics to store your component where it makes the most sense.

> ***heuristic*** - a practical method [for decision making] that is not guaranteed to be optimal, perfect, or rational, but is nevertheless sufficient for reaching an immediate, short-term goal. - [*wikipedia*](https://en.wikipedia.org/wiki/Heuristic)

<!-- I say heuristics since there will always be gray area -->

### My goal is to:
1. Enumerate the rules I've found that work for me and my team when determining which level a component.
2. Provide code showing how to implement each of the five levels.
3. Show usage of these components in the context of a "real" site.

You are free to disgreee with any/all of the rules I present. You may find that they do not cover every edge case. My hope, rather, is that you come away with an understanding of how to implement this in your own way to ultimately reach a higher goal for your projects:

**organization, reusability, flexibility, and composability**

> Atomic design is not a linear process, but rather a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time. - *Brad Frost*

### Sample Code

Throughout this article I'll be sharing and referring to code that I've developed in the form of a relatively simple list/todo app. There's no interactive functionality. It's designed to show visually & structurally how components build on one another other using Atomic Design.

- Website: https://atomic-design-example.benjaminwfox.com/
- Repository: https://github.com/BenjaminWFox/example-app-atomic-design

## [Atoms](#atoms)
The **atom** is the most basic component, as generic as can be.

### Examples:

Icons, buttons, links, and labels are good examples of atoms. They don't do much on their own, and many other components on a site will typically depend on using these in one way or another.

### Rules of Atoms:

- Should not compose other components
  - Exception: I will put framework-specific components (like the NextJS `Link` component) that are very close do the native element (`a`) in atoms
- Can have its own markup & styles
- Can maintain its own, local state
- Able to be reused throughout the codebase regardless of organism/page/template
- Should not access application (or higher level) state directly
- Should not fetch application-specific data
- Should not implement any application-specific business logic


## Molecules
The **molecule** composes atoms, and may introduce additional markup and styling. 

## Examples:



### Rules:
- A component made up of multiple Atoms
	- Exception: You may or may not allow molecules to compose other molecules. If not, any multi-molecule components are organisms.
- Can have its own markup & styles
- Can maintain its own, local state
- Able to be reused throughout the codebase regardless of organism/page/template
- Should not access application (or higher level) state directly
- Should not fetch application-specific data
- Should not implement any application-specific business logic


## Organisms
- A complex component made up of multiple atoms and/or molecules and/or other organisms
- Can have its own markup & styles
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state


## Templates
- A component that facilitates the layout of multiple organisms
- Can have its own markup & styles.
- Should not access application (or higher level) state
- Should not fetch application-specific data
- Should not implement any application-specific business logic


## Pages
- A component that implements a particular template
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state
- Should not have its own markup & styles

## One Rule to Rule Them All

As mentioned earlier, our end goal inclueds reusability and composability. To that end, remember this rule even if you forget everything else you're read already:

***Do not *ever* set margins externally (on the component itself). Only set margins internally (from a parent).***

What do I mean?

[... example ...]
