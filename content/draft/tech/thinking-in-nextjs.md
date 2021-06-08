---
title: "How to think in Next.js"
date: "2021-06-06"
subtitle: "Moving from Single Page App development to Next.js requires a 180 degree shift in your mental model around how your application functions. This can be quite a headache."
category: "tech"
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/thinking-in-nextjs/owl-head-backwards-180-degrees.jpg)

Single Page Applications and Next.js, like Apples & Oranges, Chocolate & Vanilla, or Mac & PC are very different creatures. And of course one is always better (Next, apples, chocolate, Mac 🤣).

Starting with Next.js after working on SPAs can be challenging though, since you've now got this whole server thing to think about not to mention a node.js runtime 😱

It can feel like a steep learning curve, especially if you haven't worked much with Node.js, but at the end of the day remember that **this is mostly still React**! A majority of getting comfortable with Next.js, I've found, is understanding four things:
- The difference between the client & server contexts
- The Next.js application lifecycle
- What kind of page to build
- How the API routes work

Next.js is a lot of fun to build with once you get a handle on how it works 🏗

- [Intro](#intro)
- [Time](#time)
- [Execution Context](#execution-context)
  - [Environment Variables](#environment-variables)
- [Pages and API Routes](#pages-and-api-routes)
  - [Pages](#pages)
  - [API Routes](#api-routes)
- [Application Development Lifecycle](#application-development-lifecycle)

## Intro

The considerations I want to focus on all revolve around the fact that there is now a server you have to deal with.

I think it's hard to overstate how important this is! The biggest gotcha?

**Adding a server adds an execution context**

Consider that you've essentially doubled the complexity of your application!

*In a SPA*

- Your code executes in the browser *only*
- You have access to [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) and [the DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM)
- It's easy to know to exclude secret & sensitive information since *everything* is available to use end user

*In Next.js*

- Your code executes on the server *first* and in the browser *second*
  - On the server, this could be at [buildtime or at runtime](#application-development-lifecycle)
- You *do not* have access to Web APIs & the DOM *on the server*
- You *do* have access to a whole new set of [APIs in Node.js](https://nodejs.org/docs/latest/api/)
- You *can* include secret & sensitive information (API keys, connection strings, passwords, etc...) on the server

This *also* means implementing functionality which may have had a common approach for SPAs now has multiple approaches to choose from depending on a variety of factors related to how you design your application.

[TAKE OUT??]()
Examples include:
- Authentication. There's [a good article by Auth0](https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/) explaining some considerations.
- Deploying. You may do different thigns depending on how you've created your pages.

## Time

Expect that things will take longer, at least at first.

If you're learning Next on your own, hopefully you can take whatever time you need learn the ins and outs! If you're adopting it in a professional setting, however, be prepared to pad any estimates until you become more familiar with the framework.

This will set you up better for success by making sure you have the time needed to do things correctly the 'Next' way, and not just revert to SPA patterns on top of Next.

Inevitably there will be places where adding functionality is just more complex when rendering occurs in both a server and a browser context.

Examples include:
- [Redux](https://redux.js.org/recipes/server-rendering#redux-on-the-server) where server state may need to be merged with client state.
- [CSS-In-JS](https://cssinjs.org/server-side-rendering) where server-generated style tags need to be removed before rendering on the client. 

## Execution Context

Your code will execute both on the server and on the client (browser). There may be code you write that can *only* execute in one or the other of these. Common examples are:
- The browser globals `window` & `document` are `undefined` on the server
- The Node.js File system (`fs`) module is `undefined` in the browser

Right off the bat do yourself a favor and create two utility functions you can use to run code in only one or the other of these places:

```javascript
export const isClient = () => typeof window !== 'undefined'
export const isServer = () => !isClient()
```

⚠️ In React the `useEffect` (or `useLayoutEffect`) hook will *only* run in the browser.

⚠️ Don't leave unused imports; Node.js modules that are imported and unused will throw errors. The reference won't be removed before the code goes to the client and the browser will choke on the Node.js code.

### Environment Variables

Next has some idiosyncracies around environment variables, and it's worth [reading through the documentation](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables), but a couple things to call out specifically:
- Environment variables are not public by default so if you want to use them in the browser you must prefix the name with `NEXT_PUBLIC_`.
  - ⚠️ In a production site, non-prefixed variables that are carelessly rendered or logged on [SSG Pages](#pages) *are still be visible* [for a flash](https://github.com/vercel/next.js/discussions/23980) before being removed.
- [SSG Pages](#pages) require environment variables to be present at buildtime, while SSR pages require them at runtime.

## Pages and API Routes

With Next.js you'll be building out *not only* pages *but also* API routes. Next uses a "magic" folder and file-system based router. This means that any file in the top-level `/pages` directory gets turned into [a client route](https://nextjs.org/docs/routing/introduction) on your site. Likewise, any file in the `/pages/api` folder will be turned into an [API route](https://nextjs.org/docs/api-routes/introduction).

Before jumping in to building either of these it pays to step back and think about:
- where does your content come from?
- how often does your content change?
- how much does a page depend on certain content?

There are bigger implications to these answers when working in Next.js compared to working on a SPA.

Where your content comes from may change which Node.js modules you need to use or whether you will need to interact with a database.

How often your content changes and how much of a page depends on that content will change whether you want to implement the page via Static Site Generation (SSG), Server Side Rendering (SSR), or some combination of those mixed with client side rendering.

### Pages

[Think of it like starbucks...]
- Drip coffee? Ready to go!
- Espresso? Standard build, easy
- TikTok special? 

Remember that page code may be executed on both the server and client! If you have any sensitive information in environment variables or other stores be careful that it doesn't get sent to the client accidentally.

So which page type should you prefer and how do you know which to use when?

**SSG**

The fastest option is [Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) since the server does little to no processing. It only has to return pre-built, static content. Use this option with content that doesn't change frequently (or ever). Blogs, marketing sites, policy documents, and FAQs all fall more or less in this category.

This can get cumbersome on sites with many (thousands or more) pages, but can be mitigated to some degree with [incremental static regeneration](https://vercel.com/docs/next.js/incremental-static-regeneration#).

**SSR**

[Server Side Rendering](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) will be generally a little slower to [first-contentful-paint](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint), but it's an excellent option for pages that depends on particular input data and where it isn't possible (or feasible) to statically generate all page combinations for given inputs. Input data might be something like user details, purchase/order history, weather, time, or traffic.

**CSR**

[Client Side Rendering](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side) can be *added* in addition to either of the strategies above if a part of the page has frequently updating or real-time data.

This is essentially the same as a SPA page might render, although parts of the page surrounding client-rendered content may have already been generated via SSG or SSR.

### API Routes

These run entirely in the server context. You can use sensitive keys, secrets, passwords, and connection strings if required. You could interact with the filesystem, say, to pull in markdown documents for creating content. You could add an ORM like Prisma to interact with a database.

With API routes, keep in mind:
- They always receive a request (`req`) and return a response (`res`), otherwise the browser request will not finish.
- API routes can be used at runtime, but they can also be used only during buildtime to fetch & build static content.
- `req` and `res` are Node.js built-in objects.

The `req` object is an instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage), which is when the client (browser) requests something from the server via an API Route, as with `fetch`.

The `res` object is an instance of [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse), which is when the server responds to a client `req`.

⚠️ The `res` object *additionally* has [some extra helper methods](https://nextjs.org/docs/api-routes/response-helpers) added by Next, which make building the response easier than default `http.ServerResponse` functionality. It tripped me up when I saw these helpers used in tutorials but couldn't find them referenced in the Node.js documentation.

**API Routes in getServerSideProps & getStaticProps**

There is an important best practice caveat [buried in the documentation](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) that is worth noting:

> You should not use fetch() to call an API route in getServerSideProps [or getStaticProps]. Instead, directly import the logic used inside your API route. You may need to slightly refactor your code for this approach. 

API Routes in Next are written as:

```javascript
export default async function handler(req, res) {...}
```

Borrowing the example from the documentation above you can rewrite the API route function like:

```javascript
// Via `fetch`, as in documentation
export default function handler(req, res) {
  res.status(200).json({ name: 'Next.js' })
}

// Via `import`
export async function getUserName(req, res) {
  return { name: 'John Doe' }
}
```

⚠️ This becomes more complicated if you want to have ***both*** `fetch` and `import` options available:

`getServerSideProps` (similar to `getStaticProps`) is written as:

```javascript
export async function getServerSideProps({req, res}) {...}
```

The main difference being that here the `req` and `res` are destructured from a larger `context` object. Importantly this `res` object in `getServerSideProps` **does not have the extra helper methods** that Next adds to the `res` on API Routes - it is just a plain Node.js `http.ServerResponse`.
- If you have that requirement I'd honestly suggest forgetting the `import` style function and just use `fetch`. I suspect any performance impact is negligible.
- In the one case I encountered this situation I ended up creating a middleware wrapper to end any response without use of the helper methods, using only Node.js built-ins, but that's beyond the scope of this article.


## Application Development Lifecycle

There are more moving parts here than when building a SPA. Development is mostly the same, but the build and deploy stages introduce additional complexity.

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

<!-->
### Node.js Built-in modules

Node.js has [a whole lot of built-in modules](https://nodejs.org/dist/latest-v16.x/docs/api/). I wouldn't bother trying to learn or even read through them all, but it's worth knowing they exist and there are a few I think are worth calling out in particular:

- `fs` - The [File system](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fs_file_system) API is *very* handy for creating content from static files (like markdown) stored locally in the project - documentation, legal disclaimers, blog posts, etc.... 
- `path` - The [Path](https://nodejs.org/dist/latest-v16.x/docs/api/path.html#path_path) API may be familiar if you've done much Webpack configuration. It's useful with `fs` to make sure you find the files you're looking for.
- `process` - [Process](https://nodejs.org/api/process.html#process_process) is a Node global. It's mostly worth mentioning since there is a particular instance where the `path.dirname()` (or `__dirname`) will give incorrect results in `getStaticProps` so [you should use `process.cwd()` instead](https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd).
<-->

## Further Reading <!-- omit in toc -->

I hope that this has given you some new insight as you get started with Next.js!

If you're looking to set up Next.js beyond the basic scaffold, [check on my tutorial on adding tests, linting, and absolute imports](https://benjaminwfox.com/blog/tech/nextjs-setup-config-testing-linting-absolute-imports) to a Next.js project.

## Questions? Comments? <!-- omit in toc -->

Follow me on Twitter [@BenjaminWFox](https://twitter.com/BenjaminWFox) for more tech and leadership content, and reach out with any thoughts or questions!
