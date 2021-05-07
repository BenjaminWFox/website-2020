---
title: "Better App Organization with Atomic Design for Developers"
date: "2021-04-18"
subtitle: "A practical guide to organizing and building component based apps around the Atomic Design methodology."
category: "tech"
---

Organizing your application can seem easy. A folder for components, one for assets, another for utility methods. Maybe even a separate folder for pages! Don't be fooled, it is almost never that easy...

<p><img style="width: 100%;" alt="Futurama Meme: Too much papers! Not enough hiding plants!" src="/images/blog/tech/atomic-design-for-developers/leela-too-much-papers.png"/></p>

> "It's alright. This place just needs a one-hour bureaucratizing."
>  
> — Hermes Conrad

And what is bureaucracy if not rules and regulations! As your app starts to grow, you should have a way to organize things that provides more granular organization, separation and, importantly, is based on explicit rules and guidelines rather than guesswork or instinct.

### My Goal

I'll provide a little background, but there is a lot of content out there about Atomic Design generally, both from designers and developers. My main goal is three-fold:

1. Enumerate the rules I've found that work for me and my team when determining how to categorize a component.
2. Provide code showing implementation for each of the five categories.
3. Show usage of these components in the context of a "real" site.

**Please note:** You are free to disagree with any/all of the rules I present. You may find that they do not cover every edge case. I'd love to [hear any thoughts and opinions](https://twitter.com/benjaminwfox). My hope is just that you come away with an idea of how to implement this methodology in a way that works for you.

### Contents

1. [Backstory](#backstory)
2. [Atomic Design](#atomic-design)
3. [Why this Article](#why-this-article)
4. [Why NOT this Article](#why-not-this-article)
5. [Sample Code](#sample-code)
6. [Atoms](#atoms)
   1. [Examples of Atoms](#examples-of-atoms)
   2. [Rules of Atoms](#rules-of-atoms)
7. [Molecules](#molecules)
   1. [Examples of Molecules](#examples-of-molecules)
   2. [A Nebulous Molecule](#a-nebulous-molecule)
   3. [Rules of Molecules](#rules-of-molecules)
8. [Organisms](#organisms)
   1. [Examples of Organisms](#examples-of-organisms)
   2. [Rules of Organisms](#rules-of-organisms)
9. [Templates](#templates)
   1. [Examples of Templates](#examples-of-templates)
   2. [Template Variations](#template-variations)
   3. [Tiered Templates](#tiered-templates)
   4. [Rules of Templates](#rules-of-templates)
10. [Pages](#pages)
   1. [Examples of Pages](#examples-of-pages)
   2. [Rules of Pages](#rules-of-pages)
   3. [A Note on Routes](#a-note-on-routes)
11. [Conclusion](#conclusion)
   1. [One Rule to Rule Them All](#one-rule-to-rule-them-all)

## [Backstory](#backstory)

A few years back I was searching for a better way to organize components in web apps. The designers I was working with at the time were adopting a design system that followed Atomic Design principles and it seems like that would translate well into the front-end development space since ultimately our work was to implement the components created by the design team.

Having a common language to use for categorizing components seemed like a no-brainer, although for a variety of reasons unrelated to Atomic Design this didn't end up being the case between our designers and engineers. 

It did work out pretty well for the engineering team internally though so, good news, you don't need to have buy-in and adoption from designers to start using these principles for development!

## [Atomic Design](#atomic-design)

[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design) is a methodology for creating design systems created by [Brad Frost](https://bradfrost.com/). You can read his full post for a comprehensive overview.

For the purposes of this article it's important to know that Atomic Design breaks design systems (and the components that make up an application) into a hierarchy with five levels.

It begins at the smallest component level (atoms) and combining those to create larger components (molecules) which themselves get combined into still larger components (organisms) which are then displayed in logical groups (templates) that make up the the app (pages).

**`Atoms -> Molecules -> Organisms -> Templates -> Pages`**

In this article I'm going to talk about applying Atomic Design principles to front-end development. I'll be using React for specific examples, but the definitions and principles should apply to any component or composition based UI applications.

## [Why this Article](#why-this-article)

The biggest challenge I faced with my team after deciding to use Atomic Design principles as the basis for our component organization and hierarchy was figuring out what components went into which buckets. There were some other writeups I found that had bits and pieces of details, but I never found anything that gave both a prescriptive example of how each level might be delineated and examples of implementation and usage.

When you're building reusable components there are a lot of considerations, including decisions like how a component is structured, what data it needs, where that data lives, if (and where) state is needed, and so on. Since you've (hopefully) already made most or all of those decisions before starting the build the component, you can use them as a set of heuristics to store your component where it makes the most sense.

> ***heuristic*** - a practical method [for decision making] that is not guaranteed to be optimal, perfect, or rational, but is nevertheless sufficient for reaching an immediate, short-term goal.
> 
>  — [wikipedia](https://en.wikipedia.org/wiki/Heuristic)

I say heuristics intentionally, since you're certain to find edge cases or gray areas in any methodology. The goal is to make sure those are few and far between, so you're left with a system of organization providing maximum **reusability, flexibility, and composability**.

> Atomic design is not a linear process, but rather a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time.
> 
>  — Brad Frost

## [Why NOT this Article](#why-not-this-article)

In my experience this approach is best suited to applications that are (or expect to be) large, frequently updated, and/or frequently extended.

It helps to have a well-planned design and information hierarchy, but it's not strictly necessary. Even with relatively simple mockups or wireframes you can start to develop a sense of what parts of the UI build upon one another.

I would not use this approach if I were working on libraries or applications that were relatively limited in scope, complexity, or life expectancy.

## [Sample Code](#sample-code)

Throughout this article I'll be sharing and referring to code that I've developed in the form of a relatively simple list/todo app. There's no interactive functionality. It's designed to show visually & structurally how components build on one another other using Atomic Design. On the site, you can take a look at [the /settings page](https://atomic-design-example.benjaminwfox.com/settings) to toggle outlines for various levels of components.

- Website: https://atomic-design-example.benjaminwfox.com/
- Repository: https://github.com/BenjaminWFox/example-app-atomic-design

## [Atoms](#atoms)
The **atom** is the most basic component, as generic as can be.

### [Examples of Atoms](#examples-of-atoms)

Icons, buttons, links, and labels are good examples of atoms. They don't do much on their own, and many other components on a site will typically depend on using these in one way or another. They can be used virtually anywhere throughout a site, so have a lot of flexibility. Let's look at a very basic example, the `Button`:

```javascript
export default function Button({label, onClick}) {
  return <button role="button" onClick={onClick}>{label}</button>
}
```

This is about as basic as it gets. Not even any styles needed here. While that may not be the case for most sites, styles would not add much complexity and wouldn't change anything about the "Atomness" of the `Button`. For one other example, a `BlockLink`:

```javascript
import Link from 'next/link'

export default function BlockLink({href, children}) {
  return <div className="underline"><Link href={href}>{children}</Link></div>
}
```

For whatever reason, the demo site I built has a frequent need for block links! In this case importing a framework primitive is fine. It's smaller than an Atom. You can call it a *neurotron* if you want, that's a cool-sounding mash-up word 😎 ⚛️. The `Link` is just an abstraction of the `a` tag with framework-specific functionality. It doesn't do anything from a style or markup perspective.

![Screenshot.](/public/images/blog/tech/atomic-design-for-developers/atoms-example.png)
*Visual example of Atoms: `BlockLink`, `Button`, and `Icon` components.*

### [Rules of Atoms]()

- Should not compose other components/only uses [native elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or framework-specific components similar to native elements
- Can have its own markup & styles 
- Can maintain its own internal state
- Should not be tightly coupled to specific UI or Logic areas
- Should not access application (or higher level) state directly
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## [Molecules]()
The **molecule** composes atoms to create a more complex component, with its own markup and styling added to the mix. Aside from that, the rules I use for molecules are virtually identical to those of atoms.

### [Examples of Molecules]()

Molecules, being made up of Atoms, tend to be a little more specific in usage but (and this is of course also design dependant) they should also still be reusable is areas throughout the site. Below is an example atom `ImageWithOverlay` that overlays some text onto an image. It doesn't have much in the way of specific styling besides positioning the text.

Below that is a molecule `BannerImage` that composes `ImageWithOverlay` to create a banner designed specifically to be added at the start of content, flush with the top & side margins of its parent element.

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
    <div
      style={{height}}
      className={[styles.banner, 'flush-width', 'flush-top'].join(' ')}>
      <ImageWithOverlay title={title} subtitle={subtitle} src={src}/>
    </div>
  )
}
```

Compare the `BannerImage` here (stretched to the top & side margins) against the `ImageWithOverlay` in the previous screenshot:

![Image showing the `BannerImage` component.](/public/images/blog/tech/atomic-design-for-developers/molecules-example.png)

### [A Nebulous Molecule]()

There are a few components in the example project that, on first glance, don't fit neatly into the molecule definition. The `SidebarLinkList`, `HeaderLinkList`, and `HeaderIconList` fall into this category. They are all about the same, and render a collection of children in a single `div`:

```javascript
import styles from './header-link-list.module.css'

export default function HeaderLinkList({children}) {
  return <div className={styles.headerLinkList}>{children}</div>
}
```

The reason I've labeled these as molecules is that while they don't explicitly compose any atoms, they all depend implicitly on a specific atom being passed as `children`. In the case here of the `HeaderLinkList`, all the children should be `BlockLink` components. If the example app were more robust, I might create a custom `PropType` entry to throw an error if any of the `children` were not `BlockLink`.

### [Rules of Molecules]()
- A component made up of one or more Atoms
- Can have its own markup & styles
- Can maintain its own internal state
- Should not be tightly coupled to specific UI or Logic areas
- Should not access application (or higher level) state directly
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## [Organisms]()
Organisms are where the business logic of your application starts to come out. They might correspond to a specific feature or section of the app. They may also be generally applicable but tightly coupled with the application logic. Data fetching and reading/writing to application state should primarily happen here (or alternatively at the Page level).

### [Examples of Organisms]()

One of the more basic organisms in the sample app is the `SidebarNavigation`. At two molecules and one atom, it has not grown terribly complex, but it is *specialized enough* - designed to live in the sidebar and further composes a molecule - that it is no longer a molecule itself.

> Constructing organisms might be a good time to re-evaluate your other components. Do they really belong where you've categorized them? If they *are* categorized in the correct place, have you named them appropriately?

Literally as I am writing this, I noticed that in the `SidebarNavigation` component I had named `IconHeading` as `SidebarTitle`, and `VerticalListLayout` as `SidebarLinkList` 😱 

**That's sub-optimal!**

Why? There isn't anything explicitly sidebar-related about those two components!

It just happened that the sidebar was the only place they had been implemented. While I feel I was correct in making them molecules (even that may be debateable for the `VerticalListLayout`, but meh...heuristics), if they were *actually* only usable within the context of the sidebar adding them as organisms may have been more appropriate.

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

### [Rules of Organisms]()

- A complex component made up of multiple atoms and/or molecules and/or other organisms
- Can have its own markup & styles
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state
- Can be tightly coupled with a specific area (UI and/or Logic) of the app
- Can be organized into sub-folders by logical categorization (feature, page, etc...)

## [Templates]()
Templates are a way to ensure that the Pages of your app are consistent. They handle creating the layout, and make it easy to know where specific areas of content or functionality need to go. There are a number of ways to create templates. The way I'm going to show is very explicit, and I like it because it helps force high-level separation of application logic (into pages and organisms) and application layout (in templates).

### [Examples of Templates]()

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

The component really doesn't do much right?! The css import does most of the heavy lifting, but even then it's not much - primarily setting `flex` properties, widths, and heights. It's not until this component is composed into Pages that the good times start rolling 🥳 as each of those props (`header`/`sidebar`/`content`) will be an individual component that we can count on to be placed on screen exactly as intended 🤓

![Screenshot.](/public/images/blog/tech/atomic-design-for-developers/template-example.png)
*A template, highlighting the Header, Sidebar, and Content*

### [Template Variations]()

It can be tempting to start adding additional props to templates to support 'variations' like a border, a background color, or other minor stylistic differences. Is this something I've done? 👀 Yes. Is this something you should do? No. Is it the end of the world if you do? Also no.

Just consider that the more thought that has to go into using the template component, the less useful it becomes. The beauty is in its simplicity and not having to worry about high-level details of how the site is laid out on the page.

### [Tiered Templates]()

It's worth noting that templates don't *have* to be implemented only at the page level. Suppose you're using a template to lay out the highest-level elements of the site (header, sidebar, content area) as you'll see in the next section, you may find that you *also* want templates to lay out content within the content area!

> Templates are an excellent choice anywhere a consistent layout is reused with different content.

### [Rules of Templates]()

- A component that facilitates the layout of multiple organisms
- Can have its own markup & styles.
- Can accept & pass props as required.
- Should not access application (or higher level) state
- Should not have any non-ui/layout related side effects
- Should not implement any application-specific business logic

## [Pages]()
Pages are the final piece of the puzzle, and each one will implement a specific Template. Pages are distinctly separate from Routing, and while I'm not coving Routing in this article it should at least be said that in the same way each Page implements a Template, each Route should implement a Page.

Because I'm using React with Next.js, which has page-based routing, I've made a specific delineation in my project structure. All Atomic Design Pages live under `/src/components/pages`, and all Routes live under `/src/pages`. Excluding the special `_app.js`, there is a 1:1 ratio of component pages to route pages.

### [Examples of Pages]()

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

### [Rules of Pages]()
- A component that implements a particular template
- Can fetch application-specific data
- Can implement application-specific business logic
- Can be connected to application (or higher level) state
- Should not have its own markup & styles

### [A Note on Routes]()
You may find, depending on your particular framework, that Routes do more of the heavy lifting than pages. In Next.js this will probably be the case, since it is in the Routes where you have to work with the special `getStaticProps` and `getServerSideProps`. 

That's not a problem, but I would pick just one, Pages **or** Routes, to put this logic. Whichever of those you **don't** pick should be a more basic implementation.

## [Conclusion]()

Hopefully this has given you some concrete examples of developing with Atomic Design and a new way to think about structuring your applications.

I want to reiterate the quote from Brad Frost that this is primarily "a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time." As you continue developing component based applications, always consider how you structure those components to be as generic, flexible, and reusable as possible.

### [One Rule to Rule Them All]()

To that end I have one more rule that probably deserves its own post, but has caused me enough headache over the years that it bears mentioning. If you forget everything else, remember this:

***Do not *ever* set margins externally (on the component itself). Only set margins internally (from a parent).***

What do I mean? Let's look at the `VerticalListLayout` component for an example.

