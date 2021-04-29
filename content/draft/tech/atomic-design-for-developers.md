---
title: "Better App Organization with Atomic Design for Developers"
date: "2021-04-18"
subtitle: "A practical guide to organizing and building component based apps around the Atomic Design methodology."
category: "tech"
---

Organizing your application can seem easy. A folder for components, one for assets, another for utility methods. Maybe even a separate folder for pages! Don't be fooled, it is never that easy. Without a plan, as your app starts to grow, you should have a way to organize things that provides more granular organization, separation and, importantly, is based on explicit rules and guidelines rather than guesswork or instinct.

1. [Backstory](#backstory)
2. [Atomic Design](#atomic-design)
3. [Why this Article](#why-this-article)
   1. [My goal is to](#my-goal-is-to)
   2. [Sample Code](#sample-code)
4. [Atoms](#atoms)
   1. [Examples of Atoms](#examples-of-atoms)
   2. [Rules of Atoms](#rules-of-atoms)
5. [Molecules](#molecules)
   1. [Examples of Molecules](#examples-of-molecules)
   2. [A Nebulous Molecule](#a-nebulous-molecule)
   3. [Rules of Molecules](#rules-of-molecules)
6. [Organisms](#organisms)
   1. [Examples of Organisms](#examples-of-organisms)
   2. [Rules of Organisms](#rules-of-organisms)
7. [Templates](#templates)
   1. [Examples of Templates](#examples-of-templates)
   2. [Template Variations](#template-variations)
   3. [Tiered Templates](#tiered-templates)
   4. [Rules of Templates](#rules-of-templates)
8. [Pages](#pages)
   1. [Examples of Pages](#examples-of-pages)
   2. [Rules of Pages](#rules-of-pages)
9. [One Rule to Rule Them All](#one-rule-to-rule-them-all)

## Backstory

A few years back I was searching for a better way to organize components in web apps. The designers I was working with at the time were adopting a design system that followed Atomic Design principles and it seems like that would translate well into the front-end development space since ultimately our work was to implement the components created by the design team.

Having a common language to use for categorizing components seemed like a no-brainer, although for a variety of reasons unrelated to Atomic Design this didn't end up being the case between our designers and engineers. 

It did work out pretty well for the engineering team internally though so, good news, you don't need to have buy-in and adoption from designers to start using these principles for development!

## Atomic Design

[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design) is a methodology for creating design systems created by [Brad Frost](https://bradfrost.com/). You can read the full post for a comprehensive overview.

For the purposes of this article it's important to know that Atomic Design breaks design systems (and the components that make up an application) into five levels.

It begins by starting at the smallest component level (atoms) and combining those to create larger components (molecules)which themselves get combined into still larger components (organisms) which are then displayed in logical groups (templates) that make up the the app (pages).

**`Atoms -> Molecules -> Organisms -> Templates -> Pages`**

In this article I'm going to talk about applying Atomic Design principles to front-end app development. I'll be using React for specific examples, but the definitions and principles should apply to any component or composition based UI applications.

## Why this Article

The biggest challenge I faced with my team after deciding to use Atomic Design principles as the basis for our component organization and hierarchy was figuring out what components went into which buckets. There were some other writeups I found that had bits and pieces of details, but I never found anything that gave a prescriptive example of how each level might be delineated or gave examples of implementation and usage.

When you're building reusable components there are a lot of considerations which include decisions like how it's structured, what data it needs, where that data lives, if (and where) state is needed, and so on. Since you've (hopefully) already made most or all of those decisions before starting the build the component, you can use them as a set of heuristics to store your component where it makes the most sense.

> ***heuristic*** - a practical method [for decision making] that is not guaranteed to be optimal, perfect, or rational, but is nevertheless sufficient for reaching an immediate, short-term goal. - [*wikipedia*](https://en.wikipedia.org/wiki/Heuristic)

<!-- I say heuristics since there will always be gray area -->

### My goal is to
1. Enumerate the rules I've found that work for me and my team when determining which level a component.
2. Provide code showing how to implement each of the five levels.
3. Show usage of these components in the context of a "real" site.

You are free to disagree with any/all of the rules I present. You may find that they do not cover every edge case. My hope, rather, is that you come away with an understanding of how to implement this in your own way to ultimately reach a higher goal for your projects:

**organization, reusability, flexibility, and composability**

> Atomic design is not a linear process, but rather a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time. - *Brad Frost*

### Sample Code

Throughout this article I'll be sharing and referring to code that I've developed in the form of a relatively simple list/todo app. There's no interactive functionality. It's designed to show visually & structurally how components build on one another other using Atomic Design.

- Website: https://atomic-design-example.benjaminwfox.com/
- Repository: https://github.com/BenjaminWFox/example-app-atomic-design

## [Atoms](#atoms)
The **atom** is the most basic component, as generic as can be.

### Examples of Atoms

Icons, buttons, links, and labels are good examples of atoms. They don't do much on their own, and many other components on a site will typically depend on using these in one way or another. They can be used virtually anywhere through a site, so have a lot of flexibility. Let's look at a very basic example, the `Button`:

```javascript
export default function Button({label, onClick}) {
  return <button role="button" onClick={onClick}>{label}</button>
}
```

This is about as basic as it gets. Not even any styles needed here and while that may not be the case for most sites styles would not add much complexity here, and wouldn't change anything about the "Atomness" of the `Button`. For one other example, a `BlockLink`:

```javascript
import Link from 'next/link'

export default function BlockLink({href, children}) {
  return <div className="underline"><Link href={href}>{children}</Link></div>
}
```

For whatever reason, the demo site I built has a frequent need for block links! In this case importing a framework primitive is fine. It's smaller than an Atom, so let's call it a *neurotron* since that sounds kind of cool 😎 ⚛️. The `Link` is just an abstraction of the `a` tag with framework-specific functionality. It doesn't do anything from a style or markup perspective.

![Screenshot.](/public/images/blog/tech/atomic-design-for-developers/atoms-example.png)
*Visual example of Atoms: `BlockLink` in header and sidebar, `Button` in sidebar and main content.*

### Rules of Atoms

- Should not compose other components/only uses native primitives (like HTML tags).
  - Exception: I will put framework-specific components that are very close do the native element in atoms
- Can have its own markup & styles 
- Can maintain its own, local state
- Should not be tightly coupled to specific UI or Logic areas
- Should not access application (or higher level) state directly
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## Molecules
The **molecule** composes atoms to create a more complex component, with its own markup and styling added to the mix. Aside from that, the rules I use for molecules are virtually identical to those of atoms.

### Examples of Molecules

Molecules, being made up of Atoms, tend to be a little more specific in usage but (and this is of course also design dependant) they should also still be reusable is areas throughout the site. Below is an example of an atom that overlays some text onto an image. It doesn't have much in the way of specific styling besides positioning the text.

Below that is a molecule that uses the `ImageWithOverlay` component to create a `BannerImage` designed specifically to be added at the start of content, and side flush with the top & side margins of its parent element.

```javascript
// /atoms/image-with-overlay.js
import styles from './image-with-overlay.module.css'
import Image from 'next/image'

export default function ImageWithOverlay({ title, subtitle, src, layout = 'fill' }) {
  return (
    <>
      <div className={styles.caption}>
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <Image
        src={src}
        layout={layout}
        objectFit="cover"
        objectPosition="center center"
      />
    </>
  )
}

// /molecules/banner-image.js
import Image from 'next/image'
import styles from './banner-image.module.css'
import ImageWithOverlay from '../atoms/image-with-overlay'

export default function BannerImage({ src, title, subtitle, height }) {
  return (
    <divƒ
      style={{height}}
      className={[styles.banner, 'flush-width', 'flush-top'].join(' ')}>
      <ImageWithOverlay title={title} subtitle={subtitle} src={src}/>
    </div>
  )
}
```

Compare the `BannerImage` here (stretched to the top & side margins) against the `ImageWithOverlay` in the previous screenshot:

![Image showing the `BannerImage` component.](/public/images/blog/tech/atomic-design-for-developers/molecules-example.png)

### A Nebulous Molecule

There are a few components in the example project that, on first glance, don't fit neatly into the molecule definition. The `SidebarLinkList`, `HeaderLinkList`, and `HeaderIconList` fall into this category. They are all about the same, and render a collection of children in a single `div`:

```javascript
import styles from './header-link-list.module.css'

export default function HeaderLinkList({children}) {
  return <div className={styles.headerLinkList}>{children}</div>
}
```

The reason I've labeled these as molecules is that while they don't explicitly compose any atoms, they all depend implicitly on a specific atom being passed as `children`. In the case here of the `HeaderLinkList`, all the children should be `BlockLink` components. If the example app were more robust, I might create a custom `PropType` entry to throw an error if any of the `children` were not `BlockLink`.

### Rules of Molecules
- A component made up of one or more Atoms
	- Exception: You may or may not allow molecules to compose other molecules. If not, any multi-molecule components are organisms.
- Can have its own markup & styles
- Can maintain its own, local state
- Should not be tightly coupled to specific UI or Logic areas
- Should not access application (or higher level) state directly
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## Organisms
Organisms are where the business logic of your application starts to come out. They might correspond to a specific feature or section of the app. They may also be generally applicable but tightly coupled with the application logic. Data fetching and reading/writing to application state should primarily happen here.

### Examples of Organisms

One of the more basic organisms in the RAIJ app is the `SidebarNavigation`. At two molecules and one atom, it has not yet grown terribly complex, but it is *specialized enough* - it is only designed to live in the sidebar - that it is no longer a molecule.

Constructing organisms might be a good time to re-evaluate your other components. Do they really belong where you've categorized them? If the *are* categorized in the correct place, have you named them appropriately?

Literally as I am writing this, I noticed that in the `SidebarNavigation` component I had named `IconHeading` as `SidebarTitle`, and `VerticalListLayout` as `SidebarLinkList` 😱 Why is that sub-optimal? There isn't anything explicitly sidebar-related about those two components! It just happened that the sidebar was the only place they had been implemented. While I feel I was correct in making them molecules (even that may be debateable for the `VerticalListLayout`), if they were *actually* only usable within the context of the sidebar adding them as organisms may have been more appropriate.

```javascript
import SidebarLinkList from '../molecules/sidebar-link-list'
import BlockLink from '../atoms/block-link'
import SidebarTitle from '../molecules/sidebar-title'

export default function SidebarNavigation({ title, subtitle, sidenav, selected, children }) {
  return (<>
    <IconHeading title={title} subtitle={subtitle} />
    <VerticalListLayout>
      {sidenav.map(entry => {
        const label = selected === entry.name ? `> ${entry.name}` : entry.name

        return <BlockLink key={entry.href} href={entry.href}>{label}</BlockLink>
      })}
    </VerticalListLayout>
    {children}
  </>)
}
```

The `SidebarNavigation` component is used in other more specific components like the `ListSidebar`. In this example it doesn't do a whole lot, but it would eventually require business logic for handling things like the button.

```javascript
import SidebarNavigation from '../../components/organisms/sidebar-navigation'
import Button from '../atoms/button'

export default function ListSidebar({category, name, description, sidenav}) {
  const handleClick = () => {
    alert('Add List Functionality not implemented!')
  }

  return (
    <SidebarNavigation selected={category} title={name} subtitle={description} sidenav={sidenav}>
      <Button onClick={handleClick} label="Add List" />
    </SidebarNavigation>
  )
}
```

### Rules of Organisms

- A complex component made up of multiple atoms and/or molecules and/or other organisms
- Can have its own markup & styles
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state
- Can be tightly coupled with a specific area (UI and/or Logic) of the app
- Can be organized into sub-folders by logical categorization (feature, page, etc...)

## Templates
Templates are a way to ensure that the Pages of your app are consistent. They handle creating the layout, and make it easy to know where specific areas of content or functionality need to go. There are a number of ways to create templates. The way I'm going to show is very explicit,  not as common, at least from code I've seen, but I feel is 

### Examples of Templates

In React this is not a pattern I've seen very often, although I have seen at least a couple articles where it was discussed. That may be because people more often talk about lower-level (atom/molecule/organism) or higher-level (page) components 🤷‍♂️ 

```javascript
import styles from '../../styles/Home.module.css'

export default function TemplateSidebarContent({ header, sidebar, content }) {
  return (
    <>
      <header className={styles.header}>
        {header}
      </header>
      <section className={styles.content}>
        <aside className={styles.sidebar}>
          {sidebar}
        </aside>
        <main className={styles.main}>
          {content}
        </main>
      </section>
    </>
  )
}
```

The component really doesn't do much from a markup standpoint. The css does most of the work, but even then it's not much - primarily setting `flex` properties, widths, and heights. It's not until this component is composed into Pages that the good times start rolling 🥳 as each of those props (`header`/`sidebar`/`content`) will be an individual component that we can count on to be laid out on screen exactly as intended 🤓

![](/public/images/blog/tech/atomic-design-for-developers/template-example.png)
*An empty template - Header, Sidebar, and Content*

### Template Variations

It can be tempting to start adding additional props to templates to support 'variations' like a border, a background color, or other minor stylistic differences. Is this something I've done? 👀 Yes. Is this something you should do? No. Is it the end of the world if you do? Also no.

Just consider that the more thought that has to go into using the template component, the less useful it becomes. The beauty is in its simplicity and not having to worry about high-level details of how the site is laid out on the page.

### Tiered Templates

It's worth noting that templates don't *have* to be implemented only at the page level. Suppose you're using a template to lay out the highest-level elements of the site (header, sidebar, content area) as you'll see in the next section, you may find that you *also* want templates to lay out content within the content area!

Templates are an excellent choice anywhere *a consistent layout* is reused with *different content*.

### Rules of Templates

- A component that facilitates the layout of multiple organisms
- Can have its own markup & styles.
- Can accept & pass props as required.
- Should not access application (or higher level) state
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## Pages
Pages are the final piece of the puzzle, and each one will implement a specific Template. Pages are distinctly separate from Routing, and while I'm not coving Routing in this article it should at least be said that in the same way each Page implements a Template, each Route should implement a Page.

Because I'm using React with Next.js, which has page-based routing, I've made a specific delineation in my project structure. All Atomic Design Pages live under `/src/components/pages`, and all Routes live under `/src/pages`. Excluding the special `_app.js`, there is a 1:1 ratio of component pages to route pages.

### Examples of Pages

```javascript
import TemplateSidebarContent from '../templates/template-sidebar-content'
import UserHeader from '../../components/organisms/user-header'
import CategoryDetails from '../../components/organisms/category-details'
import CategorySidebar from '../../components/organisms/category-sidebar'

export default function Category({name, description, category, categories, sidenav}) {
  return <TemplateSidebarContent
    header={<UserHeader />}
    sidebar={<CategorySidebar category={category} name={name} description={description} sidenav={sidenav} />}
    content={<CategoryDetails category={category} />}
  />
}
```

For each page I'll pick both the template and the components to fill the template. These could be fairly general use like the `UserHeader`, which is used on all pages. They can also be specific use like the `CategoryDetails` component. As mentioned in the Templates section, the `CategoryDetails` component *could* implement another template if needed! Heck, either of the other components could implement another template as well if the content were complex enough!

### Rules of Pages
- A component that implements a particular template
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state
- Should not have its own markup & styles

## One Rule to Rule Them All
As mentioned earlier, our end goal includes reusability and composability. To that end, remember this rule even if you forget everything else you're read already:

***Do not *ever* set margins externally (on the component itself). Only set margins internally (from a parent).***

What do I mean?

[... example ...]
