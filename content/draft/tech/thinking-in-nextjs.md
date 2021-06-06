---
title: "How to think in NextJS; From SPA to Serverless"
date: "1900-12-24"
subtitle: "A brief and informative blurb related to the post"
category: "tech"
canon: 'https://external.com?if=originally-published-elsewhere'
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

## Outline

- What's the same
  - It's React!
- SPA vs Traditional/Next

- Budget more time
  - Things aren't as simple as they were in SPAs
  - CSS, for instance
  - Examples resource: https://github.com/vercel/next.js/tree/master/examples

- Browser Only Code

- Server Only Code

- Plan your pages
  - Think about your routing
  - How often do the pages change

- Plan your APIs
  - Import apis used locally
    - Database, Filesystem, APIs

- Learn common Node APIs

- Watch your environment variables

- Consider deployment options

- Other points of awareness
  - You can customize your webpack config

## Preface

So you've decided to switch from building Single Page Applications (SPAs) to hybrid serverless application with Next.js? Very cool 🥳 In my opinion you're in for a good time! Even if you don't stick with Next (I didn't, the first time I picked it up) you're going to learn some cool new technology and architecture.

[Reword this if snipping out serverless details]
If you're already familiar with serverless architecture go ahead and skip the next section, but if you're not I think it can be extremely helpful to have a high-level understanding of what it is and what it enables before getting too deep into Next.js.

So let's talk about some things you should know before diving in head first; Next.js, and serverless applications generally, require a different mental model for creating an optimized application since the server (while 'serverless' 🤣) does a lot more than just pass back a bundle of markup, styles, and scripts.

I'm not going to into much technical detail or code, as that's beyond the scope of this article. If you're looking to set up Next.js beyond the basic scaffold, [check on my guide to adding tests, linting, and absolute imports](https://benjaminwfox.com/blog/tech/nextjs-setup-config-testing-linting-absolute-imports) to Next.js.

As far as starting out, just remember like any new learning there will be a learning curve. If you haven't worked much with Node.js the curve will be even steeper.

It's definitely worth it, so don't get discouraged if things fell extra complicated at first 😰

My main goal is to give you an overview of things to be aware of to help help flatten the curve!

## Intro

While there are some Next.js specific organization & setup particulars, virtually all of the considerations you should be aware of when switching from developing SPAs to a serverless framework like Next.js revolve around the fact that there is now a server you have to deal with.

That may seem like an obvious statement to some, but I think it's hard to overstate how important this is. The biggest gotcha?

**Adding a server adds an execution context**

Consider that you've essentially doubled the complexity of your application!

I'll start with some high-level differences between a Single Page Application and Next.js:

*In a SPA*

- Your code executes in the browser *only*
- You have access to [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) and [the DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM)
- It's easy know to exclude secret & sensitive information since *everything* is available to use end user

*In Next.js*

- Your code executes on the server *first* and in the browser *second*
- You *do not* have access to Web APIs & the DOM *on the server*
- You *do* have access to a whole new set of [APIs in Node.js](https://nodejs.org/docs/latest/api/)
- You *can* include secret & sensitive information (API keys, connection strings, passwords, etc...) on the server

In addition to the above this also means implementing functionality which may have had a common best practicefor SPAs now has multiple approaches to choose from depending on a variety of factors related to how you design your application. 

Authentication is a good example of this kind of functionality. For further reading [Auth0 has a good overview article](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/) of some considerations around authentication in Next.js.

## Not Server Related

I did say that virtually all considerations are server related - but there are some that aren't.

### Time

If you're learning Next on your own, hopefully you can take whatever time you need learn the ins and outs! If you're adopting it in a professional setting, however, be prepared to pad any estimates as you work to become more familiar with the framework.

This will set you up better for success by making sure you have the time needed to do things correctly the 'Next' way, and not just revert to SPA patterns on top of Next.

### [Framework Specifics](#framework-specifics)

By default, creating a new `Next` app puts all your folders in a top level directory.

It also supports a `/src` directory, and I'd highly recommend creating one and moving in any new code as well as the default `/pages` & `/styles` directory ([see below](#routing)). This just allows for better separation of non-code related assets.

#### [Files](#files)

[next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) - provides ways to customize build and server behaviors like webpack, url rewrites & redirects, and headers.

[_app.js file](https://nextjs.org/docs/advanced-features/custom-app) - application-wide page initialization, run *on client and server*

[_document.js](https://nextjs.org/docs/advanced-features/custom-document) - application-wide structure or markup, run *only on the server*

It's worth looking through the [advanced features](https://nextjs.org/docs/advanced-features/preview-mode) to see what else is possible.

#### [Routing](#routing)

Next uses a "magic" folder and file-system based router. This means that any file in the top-level `/pages` directory gets turned in to a route on your site. The [documentation explains it well](https://nextjs.org/docs/routing/introduction). I mention it because it's a departure from the way I alwyas thought of routes when building SPAs.

I like it because the folder structure becomes a map of your site structure so it's easy understand where pages live in relation to one another.

The only I don't like (personal pet peeve) is you may need a lot of `index.js` files (where the parent folder name would be the page name) when deeply nesting other pages.

<!--> REGION: SNIP TO NEW ARTICLE? <-->

### Serverless servers

If you're thinking 💭 "How can this possibly work without servers?" I'm with you. To be candid I think this particular terminology is unhelpful and only serves to confuse people 🤔 So what is serverless?

> Serverless computing is a cloud computing execution model in which the cloud provider allocates machine resources on demand, taking care of the servers on behalf of their customers. Serverless computing does not hold resources in volatile memory; computing is rather done in short bursts with the results persisted to storage. - [Wikipedia](https://en.wikipedia.org/wiki/Serverless_computing)

Serverless, then, doesn't mean "without servers." It just means you don't have to think about the implementation details or in-memory state of the server. Since the servers are "stateless" they don't know anything about what's happening except:
- what is specified in any given request
- what is available in persistent storage, like a database or filesystem

The benifit with this approach is that the server is available to do all kinds of pre-processing before responding to the request from the client. This can include:
- Database i/o
- Pre-rendering page markup
- Handling secrets, passwords, or other sensitive information
- Resource- or data-intensive processing that the client shouldn't have to handle

## What's in a website

In very simplified terms, a web browsers job is to translate raw HTML into human-consumable content. A browser is very good at this!

Of course it's not quite that simple. The browser *also* has to be able to interpret other data like JavaScript and CSS.

When you visit a URL your browser makes a request to a server to fetch data, and then process this data before displaying the final content on screen.

Importantly, the more data that the browser has to fetch and process the longer it will take to display the final content. 

**In a traditional, server-backed application:**
- Browser sends request to server
- Server processes the request, which *may* look like
  - Additional processing (business logic, database i/o), and building out HTML dynamically
  - Grabbing a pre-built HTML file
- Server responds with
  - HTML & CSS for displaying the pages
  - JavaScript for interactivity
- Browser receives and renders the HTML
- Browser makes *additional* requests to the server for subsequent pages
  - The browser has no context or awareness of the rest of the site
  - The server maintains an in-memory state for every session 

**The Single Page Application**
- Browser sends request to server
- Server responds immediately with a bundle<sup>*</sup> of stuff
  - Mostly JavaScript, maybe some CSS
  - Probably *not* any HTML
- Browser receives the bundle and has to process it, executing JavaScript to generate HTML
- Browser renders HTML, css, etc...
- Browser does additional processing to render subsequent pages
  - The browser has all the context & awareness for the rest of the site
  - Additional data would be requested via APIs, rather than specific page requests

**In a serverless application**
- Similar to the traditional application, except that the server has no in-memory state

<sup>*</sup> "Bundle" is the common term for what is sent to the browser with a SPA architecture.

<!--> ENDREGION: SNIP TO NEW ARTICLE? <-->

NextJS Flow

## Next.js Gotchas



* Good overview: https://christianfindlay.com/2020/07/09/blazor-vs-traditional-web-apps/

