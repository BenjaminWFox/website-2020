---
title: "How to Think in Next.js"
date: "2021-06-14"
subtitle: "Understanding your client is important in any relationship. Now you also have to understand your server."
category: "tech"
image: 'images/blog/tech/thinking-in-nextjs/thinking-in-nextjs-thinking-header.jpg'
tags: "next, react, web development, learning"
---

![Initial image used as anchor for article](/public/images/blog/tech/thinking-in-nextjs/thinking-in-nextjs-thinking-header.jpg)

Let me tell you a story about a client.

This client was demanding. They wanted *all* the things, and they wanted them *now*.

Servers know this kind of client all too well. When the client comes in, asking for everything *and* the kitchen sink, a server just has to sigh.

"A lot of that is just going to go to waste, you know," says the server, softly.

Their comments go unheeded.

Does this client sound familiar?

This client is your Single Page Application (SPA).

There's a new client in town, though, and it only asks for what it *needs*.

This client is Next.js.

It also happens to be the server 🤔

## [Clients and Servers and Node Oh My](#clients-and-servers-and-node-oh-my)

Starting with Next.js after working on SPAs can be challenging (at least it was for me) with the whole server thing going on, not to mention the node.js runtime 😱

It can feel like a steep learning curve, especially if you haven't worked much with Node.js, but at the end of the day remember that **the client is still React**! A majority of getting comfortable with Next.js, I've found, is understanding three things:
- [Client vs server contexts](#execution-context) <!-- omit in toc -->
- [Page types](#your-application-is-starbucks) <!-- omit in toc -->
- [API Routes](#api-routes) <!-- omit in toc -->

![The Count from Sesame Street saying "3 Things, Ah Ah Ah!."](/public/images/blog/tech/thinking-in-nextjs/the-count-3-things-4.jpg)

Next.js is powerful, and a lot of fun to build with once you get a handle on how it works 🏗 It combines some of the best features of traditional and single page web applications into a hybrid application.

If you want a refresher [check out the high-level differences between the three application types](/blog/tech/server-no-server-serverless-apps)!

⚠️ Expect that things will take longer, at least at first. If you're not learning at your own pace and have to make time estimates, remember to pad those so that you have the time needed to do things correctly the 'Next' way, and not just revert to SPA patterns on top of Next.

⚠️ Inevitably there will be places where adding functionality is just more complex when rendering occurs in both a server and a browser context like [Redux](https://redux.js.org/recipes/server-rendering#redux-on-the-server) or [CSS-In-JS](https://cssinjs.org/server-side-rendering).

## [Review: SPA vs Next.js](#review-spa-vs-nextjs)

![Visual diagram of the following SPA vs Next.js comparison list.](/public/images/blog/tech/thinking-in-nextjs/next-vs-spa.jpg)

***In a SPA***

Your code executes in the browser *only*
  - The entire site code bundle is downloaded upfront
  - You should not include sensitive information (API keys, passwords, etc...)
  - Subsequent pages are all built from bundle code
  - You have access to [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) and [the DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM)

***In Next.js***

Your code executes on the server *first* and in the browser *second*

On the server:
- Pages are pre-built and/or pre-rendered (more on that later)
- During API Routes & Data Fetching you *can* include sensitive information
- You *do not* have access to Web APIs & the DOM *on the server*
- You *do* have access to a whole new set of [APIs in Node.js](https://nodejs.org/docs/latest/api/)

In the Browser:
- The browser only gets the code it needs for the requested page
- None of the sensitive data from the server is available
- Subsequent pages make new requests to the server
- You have access to [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) and [the DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM)

This *also* means implementing functionality which may have had a common approach for SPAs, [like Authentication](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/), now has multiple approaches to choose from depending on a variety of factors related to how you design your application.

## [Execution Context](#execution-context)

The considerations I want to focus on all revolve around the fact that there is now a server you have to deal with. At the risk of sounding obvious, I think it's hard to overstate how important this is.

The biggest gotcha?

**Adding a server adds an execution context**

Consider that you've essentially doubled the complexity of your application!

The *context* in which your code *executes* can be either the server or the client (browser). There may be code you write that can *only* execute in one or the other of these. Common examples are:
- The browser globals `window` & `document` are `undefined` on the server
- The Node.js File system (`fs`) module is `undefined` in the browser

Right off the bat do yourself a favor and create two utility functions to wrap code that should run in only one context:

```javascript
export const isClient = () => typeof window !== 'undefined'
export const isServer = () => !isClient()
```

⚠️ Those methods aren't always necessary. The `useEffect` (and `useLayoutEffect`) React hooks will *only* run in the browser. The [API Routes](#api-routes) and [Data Fetching methods](https://nextjs.org/docs/basic-features/data-fetching) will *only* run on the server.

⚠️ Don't leave unused imports; Node.js modules that are imported and unused will throw errors. The reference won't be removed before the code goes to the client and the browser will choke on the Node.js code.

## [Your Application is Starbucks](#your-application-is-starbucks)

Before we go further, let's go back to our metaphor from the beginning. 

Our client (a customer) walks into a Starbucks. Our server (a barista) will be ready to help with whatever the client wants.

Starbucks knows certain things about what the customer might want. Since there are things they can make ahead, they have a nice selection of canned beverages (like the DOUBLESHOT) that the customer can just grab and go!

The server has to do almost no work, huzzah 🥳

But Starbucks also knows that the customer might be picky ([I'm looking at YOU Edward](https://nypost.com/2021/05/03/tiktoks-edward-trend-inspires-viral-starbucks-coffee-order/)) so they're ready to make something crazy (the TikTok Special) on the fly.

The server has to do a lot of work, dang 😰

Finally, there might be some things the server can't provide. In this case the client will sneak into the bathroom with their hip flask (don't try this at home, always drink responsibly) and add their own whisky to the coffee.

The server will do some work, and so does the client 🍻

![Starbucks drinks: A Doubleshot (as SSG), fancy TikTok special order (as SSR), and coffee with a shot of whisky (as CSR).](/public/images/blog/tech/thinking-in-nextjs/starbucks-explains-nextjs-pages.jpg)

Can you guess who Starbucks is in the scenario above? It's Next.js 😆

The three scenarios above encompass the choices you have when building pages in Next.

## [Pages](#pages)

Before building any pages it pays to step back and think about:
- where does your content come from?
- how often does your content change?
- how much of a page depends on certain content?

Answers to these questions will impact whether you want to implement the page via Static Site Generation (SSG), Server Side Rendering (SSR), or some combination of those mixed with client side rendering (CSR).

**SSG**

The Grab-and-Go: The fastest choice, [Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) means little to no processing on the server & best for [SEO](https://moz.com/learn/seo/what-is-seo) & [Core Web Vitals](https://web.dev/vitals/). The server only has to return pre-built, static content.

> "Statically generated pages are still reactive: Next.js will [hydrate](https://reactjs.org/docs/react-dom.html#hydrate) your application client-side to give it full interactivity." - [Next.js Documentation](https://nextjs.org/docs/advanced-features/automatic-static-optimization)

Use this option with content that doesn't change frequently (or ever). Blogs, marketing sites, policy documents, and FAQs all fall more or less in this category.

This can get cumbersome on sites with many (thousands or more) pages, but can be mitigated to some degree with [incremental static regeneration](https://vercel.com/docs/next.js/incremental-static-regeneration#).

**SSR**

The TikTok Special: [Server Side Rendering](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) means rather than serving pre-built pages, the server builds the page when it is requested. The browser still gets static content, but data fetching & processing likely means longer time to [largest contentful paint](https://web.dev/lcp/).

It's an excellent option for pages that depend on particular input data and where it isn't possible (or feasible) to statically generate all page combinations for given inputs.

Input data might be something like user details, purchase/order history, weather, time, or traffic.

**CSR**

The Hip Flask: [Client Side Rendering](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side) can be *added* in addition to either of the strategies above. It can serve as a strategy to defer loading *some* page content so that *most* content can be ready faster via SSG or SSR.

The deferred content might be frequently updating/real-time data like a stock chart or chatbar, or content with a particularly long load time.

⚠️ Be mindful that if some content is not readily available there may be impact to SEO and issues with [cumulative layout shift](https://web.dev/cls/).

⚠️ Remember that page code may be executed on both the server and client! If you have any sensitive information in environment variables or other stores be careful that it doesn't get sent to the client accidentally.

## [API Routes](#api-routes)

Let's extend our metaphor above even further! Consider an espresso maker, a beautiful and complex machine that you *definitely* do not want your customers, err I mean clients, touching.

![Picture of a commercial espresso machine](/public/images/blog/tech/thinking-in-nextjs/espresso-machine-is-the-api-routes.jpg)

To shield the clients from the complexity of the espresso maker, the client makes a **request** of the server. The server goes off and deals with all the complicated bits, and after a while the order is ready. Then the server gives a **response**, "Edward, I have your Venti Caramel Crunch Frappuccino!"

Until the response arrives, the client is free to doomscroll TikTok looking for cat videos and a new crazy coffee drink.

Your API Routes in Next.js mirror that interaction. They won't get you coffee, but if you build them right they can get you cat memes.

⚠️ Remember this is in the server context. You can use sensitive keys, secrets, passwords, and connection strings if required. You could interact with the filesystem, say, to pull in markdown documents for creating content. You could add an ORM like Prisma to interact with a database.

⚠️ Server-only context extends beyond API Routes. It also includes the Data Fetching methods `getServerSideProps`, `getStaticProps`, and `getStaticPaths`. These methods are more specialized and I won't be going into more detail on them here, but the documentation linked in the [pages section](#pages) for each of the three types are great resources.

For reference, an API Route looks something like:

```javascript
export default function handler(req, res) {
  // Do lots of processing...call apis...access database...

  res.status(200).json({ name: 'Next.js' })
}
```

Simple right? 😬

**The Request**

You're probably familiar with [fetching data](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) from APIs from the SPA architecture. Now you're on the API side of that transaction.

The request, or `req` object, will have all kinds of information about the request that the client has made. This includes headers, referrers, browser information.

In API Routes there is also [extra data added by Next](https://nextjs.org/docs/api-routes/api-middlewares) which includes objects for `cookies`, `query`, and `body` if that information is present.

If you're doing [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) pay especially close attention to the `method` the client is using, since [you'll want to respond differently to different methods](https://stackoverflow.com/q/6203231/1763258)!

**The Response**

The response, or `res` sends information back to the client. It's important to always send back a response or the browser request will never finish, drifting endlessly in the wind.

Similar to the `req` object, the `res` object in API Routes has [some extra helper methods](https://nextjs.org/docs/api-routes/response-helpers) added by Next, which make building the response easier than default Node.js `http.ServerResponse` functionality. It tripped me up when I saw these helpers used in tutorials but couldn't find them referenced in the Node.js documentation.

And with the response sent you're all wrapped up and ready to get on with building something new and exciting!

## [Further Reading](#further-reading) <!-- omit in toc -->

I hope that this has given you some new insight as you get started with Next.js!

If you're looking to set up Next.js beyond the basic scaffold, [check on my tutorial on adding tests, linting, and absolute imports](https://benjaminwfox.com/blog/tech/nextjs-setup-config-testing-linting-absolute-imports) to a Next.js project.

## [Questions? Comments?](#questions-comments) <!-- omit in toc -->

Follow me on Twitter [@BenjaminWFox](https://twitter.com/BenjaminWFox) for more tech and leadership content, and reach out with any thoughts or questions!
