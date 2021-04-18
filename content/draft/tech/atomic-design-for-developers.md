---
title: "Better App Organization with Atomic Design for Developers"
date: "2021-04-18"
subtitle: "A practical guide to organizing and building component based apps around the Atomic Design methodology."
category: "tech"
---

Organizing your application can seem easy. A folder for components, one for assets, another for utility methods. Maybe even a separate folder for pages! Don't be fooled, it is never that easy. Without a plan, as your app starts to grow, you should have a way to organize things that provides more granular organization, separation and, importantly, is based on explicit rules and guidelines rather than guesswork or instinct.

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

### My goal is to:
1. Enumerate the rules I've found that work for me and my team when determining which level a component.
2. Provide code showing how to implement each of the five levels.
3. Show usage of these components in the context of a "real" site.

## Challenges

The biggest challenge I faced with my team after deciding to use Atomic Design principles as the basis for our component organization and heirarchy, was figuring out what components went into which buckets. 
