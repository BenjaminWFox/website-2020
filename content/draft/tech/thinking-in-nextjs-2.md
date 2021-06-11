---
title: "How to think in Next.js 2"
date: "2021-06-06"
subtitle: "Understanding your client is important in any relationship. Now you also have to understand your server."
category: "tech"
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/thinking-in-nextjs/thinking-in-nextjs-client-header.jpg)

Let me tell you a story about a client.

This client was demanding. They wanted *all* the things, and they wanted them *now*.

Servers know this kind of client all too well. When the client comes in, asking for everything *and* the kitchen sink, a server just has to sigh.

"A lot of that is just going to go to waste, you know." says the server, softly.

Their comments go unheeded.

Does this client sound familiar?

This client is your Single Page Application.

There's a new client in town, though, and it only asks for what it *needs*.

This client is Next.js.

It also happens to be the server 🤔

## Clients and Servers and Node Oh My <!-- omit in toc -->

Yes, now there is a server. Starting with Next.js after working on SPAs can be challenging with the whole server thing going on, not to mention the node.js runtime 😱

It can feel like a steep learning curve, especially if you haven't worked much with Node.js, but at the end of the day remember that **the client is still React**! A majority of getting comfortable with Next.js, I've found, is understanding four things:
- Client vs server contexts
- Page types
- API Routes
- The application lifecycle

![The Count from Sesame Street saying "4 Things, Ah Ah Ah!."](/public/images/blog/tech/thinking-in-nextjs/the-count-4-things.jpg)

Next.js is powerful, and a lot of fun to build with once you get a handle on how it works 🏗

⚠️ Expect that things will take longer, at least at first. If you're not learning at your own pace and have to make time estimtates, remember to pad those so that you have the time needed to do things correctly the 'Next' way, and not just revert to SPA patterns on top of Next.

⚠️ Inevitably there will be places where adding functionality is just more complex when rendering occurs in both a server and a browser context like [Redux](https://redux.js.org/recipes/server-rendering#redux-on-the-server) or [CSS-In-JS](https://cssinjs.org/server-side-rendering).

So what are some big differences between Single Page and Next.js applications?

![Visual diagram of the following SPA vs Next.js comparison list.](/public/images/blog/tech/thinking-in-nextjs/next-vs-spa.jpg)

***In a SPA***

- Your code executes in the browser *only*
- You have access to [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) and [the DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM)
- It's easy to know to exclude secret & sensitive information since *everything* is available to use end user

***In Next.js***

- Your code executes on the server *first* and in the browser *second*
  - On the server, this could be at [buildtime or at runtime](#application-development-lifecycle)
- You *do not* have access to Web APIs & the DOM *on the server*
- You *do* have access to a whole new set of [APIs in Node.js](https://nodejs.org/docs/latest/api/)
- You *can* include secret & sensitive information (API keys, connection strings, passwords, etc...) on the server

This *also* means implementing functionality which may have had a common approach for SPAs now has multiple approaches to choose from depending on a variety of factors related to how you design your application.

## Execution Context

The considerations I want to focus on all revolve around the fact that there is now a server you have to deal with.

I think it's hard to overstate how important this is! The biggest gotcha?

**Adding a server adds an execution context**

Consider that you've essentially doubled the complexity of your application!

The *context* in which your code *executes* can be either the server or the client (browser). There may be code you write that can *only* execute in one or the other of these. Common examples are:
- The browser globals `window` & `document` are `undefined` on the server
- The Node.js File system (`fs`) module is `undefined` in the browser

Right off the bat do yourself a favor and create two utility functions you can use to run code in only one or the other of these places:

```javascript
export const isClient = () => typeof window !== 'undefined'
export const isServer = () => !isClient()
```

⚠️ In React the `useEffect` (or `useLayoutEffect`) hook will *only* run in the browser.

⚠️ Don't leave unused imports; Node.js modules that are imported and unused will throw errors. The reference won't be removed before the code goes to the client and the browser will choke on the Node.js code.

## Your Application is Starbucks

Before we go further, let's go back to our metaphor from the beginning. 

Our client (a customer) walks into a Starbucks. Our server (a barista) will be ready help with whatever the client wants.

Starbucks knows certain things about what the customer might want. Since there are things they can make ahead, they have a nice selection of canned beverages (like the DOUBLESHOT) that the customer can just grab and go!

The server has to do almost no work, huzzah!

But Starbucks also knows that the customer might be picky ([I'm looking at YOU Edward](https://nypost.com/2021/05/03/tiktoks-edward-trend-inspires-viral-starbucks-coffee-order/)) so they're ready to make something crazy (the TikTok Special) on the fly.

The server has to do a lot of work, dang!

Finally, there might be some things the server can't provide. In this case the client will sneak into the bathroom with their hip flask (don't try this at home, always drink responsibly) and add their own whisky to the coffee.

The server will do some work, and so does the client!

![Starbucks drinks: A doubleshot (as SSG), fancy tiktok special (as SSR), and coffe with a shot of whisky (as CSR).](/public/images/blog/tech/thinking-in-nextjs/starbucks-explains-nextjs-pages.jpg)

So did you guess who Starbucks was in our scenario above? Yes, Next.js!

The three scenarios above are basically the same way you can choose to develop your pages in Next.js.

## Pages

Before building any pages it pays to step back and think about:
- where does your content come from?
- how often does your content change?
- how much does a page depend on certain content?

How often your content changes and how much of a page depends on that content will change whether you want to implement the page via Static Site Generation (SSG), Server Side Rendering (SSR), or some combination of those mixed with client side rendering (CSR).

**SSG**

The Grab-and-Go: The fastest choice, [Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) means little to no processing on the server. It only has to return pre-built, static content. Use this option with content that doesn't change frequently (or ever). Blogs, marketing sites, policy documents, and FAQs all fall more or less in this category.

This can get cumbersome on sites with many (thousands or more) pages, but can be mitigated to some degree with [incremental static regeneration](https://vercel.com/docs/next.js/incremental-static-regeneration#).

**SSR**

The TikTok Special: [Server Side Rendering](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) will be generally a little slower to [first-contentful-paint](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint), but it's an excellent option for pages that depends on particular input data and where it isn't possible (or feasible) to statically generate all page combinations for given inputs. Input data might be something like user details, purchase/order history, weather, time, or traffic.

**CSR**

The BYOB: [Client Side Rendering](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side) can be *added* in addition to either of the strategies above if a part of the page has frequently updating or real-time data.

This is essentially the same as a SPA page might render, although parts of the page surrounding client-rendered content may have already been generated via SSG or SSR.

⚠️ Remember that page code may be executed on both the server and client! If you have any sensitive information in environment variables or other stores be careful that it doesn't get sent to the client accidentally.

## API Routes

Let's extend our metaphor above even further! Consider an espresso maker, a beautiful and complex machine that you *definitely* do not want your customers, err I mean clients, touching.

![Picture of a commercial espresso machine](/public/images/blog/tech/thinking-in-nextjs/espresso-machine-is-the-api-routes.jpg)

To shield the clients from the complexity of the espresso maker, the client make a **request** of the server. After a while when the order is ready, the server gives a **response** which includes the coffee! Until the response, the client is free to doomscroll Instagram looking for cat memes 😽

Your API Routes in Next.js basically mirror that interaction. They won't get you coffee, but if you build them right they will get you cat memes.

⚠️ Remember we're now in the server context. You can use sensitive keys, secrets, passwords, and connection strings if required. You could interact with the filesystem, say, to pull in markdown documents for creating content. You could add an ORM like Prisma to interact with a database.

⚠️ Server-only context extends beyond API Routes and includes the Data Fetching methods `getServerSideProps`, `getStaticProps`, and `getStaticPaths`. The Data Fetching methods are more specialized and I won't be going into more detail on them. The documentation linked in the [pages section](#pages) is a great resource.

For reference, an API Route looks something like:

```javascript
export default function handler(req, res) {
  // Do lots of processing...call apis...access database...

  res.status(200).json({ name: 'Next.js' })
}
```

**The Request**

You should be familiar with fetching data via APIs from the SPA architecture, now you're on the API side of that transaction.

The request, or `req` object will have all kinds of information about the request that the client has made. This includes headers, cookies, referrers, browser information, a `query` if it was a `GET` request, or a `body` if it was `POST`.

**The Response**

The response, or `res` sends information back to the client. It's important to always send back a response or the browser request will never finish, drifting endlessly in the wind.

There are standard Node.js methods you can use to end the requset, but Next.js *also* [adds some extra helper methods](https://nextjs.org/docs/api-routes/response-helpers) which make building the response much more straight forward.

## Application Development Lifecycle

As you've seen, there is some more complexity developing with Next.js than a SPA. If you're not using the Vercel platform (which really does make things easy), building and deploying the site can also be a bit tricky.

**Development**

The `next dev` command, for when you are buildling the site. Fast Refresh is pretty nice.

⚠️ Since you have *two* execution contexts, pay attention where you `console.log()` for debugging. If the `log` is executing in the client context it will show up in the browser, but if the `log` is executing in the server context it will show up in the terminal where `npm run dev` is running!

**Build**

The `next build` command. During buildtime Next creates a deployment bundle. Any pages that use `getStaticProps` will be created as static content. Depending on how complex or numerous your static pages are, there may be a lot of code that executes during this stage.

The output from this command is very useful to see both how much data you're sending to the client on requests for various pages, and also to confirm that your pages were built the way you expected them to be with [either SSG or SSR](#pages).

**Deployment**

This is a step to push all files required to run the site wherever they need to go. If you use the Vercel platform this is easy - push it and forget it. If you are *not* using the Vercel platform, there will be more work involved.

⚠️ The bare minimum files that will need to be copied to the remote server in order to run the site are `next.config.js`, `node_modules`, `package.json`, and `.next` folder. Alternately you could skip copying `node_modules` and `npm install` directly on the remote server.

**Run**

The `next start` command. Code is running on the remote server. When a client makes a request, any pages that use `getServerSideProps` are pre-rendered on the server before being sent to the client. Any pages that were pre-build via `getStaticProps` are served immediately on request.

## Further Reading <!-- omit in toc -->

I hope that this has given you some new insight as you get started with Next.js!

If you're looking to set up Next.js beyond the basic scaffold, [check on my tutorial on adding tests, linting, and absolute imports](https://benjaminwfox.com/blog/tech/nextjs-setup-config-testing-linting-absolute-imports) to a Next.js project.

## Questions? Comments? <!-- omit in toc -->

Follow me on Twitter [@BenjaminWFox](https://twitter.com/BenjaminWFox) for more tech and leadership content, and reach out with any thoughts or questions!
