---
title: "A quick & condensed introduction to a Next.jS codebase"
date: "2020-06-19"
subtitle: "A guide to Next.js idiosyncracies."
category: "draft"
---

# Get starged with Next.js

A guide to Next.js - what it is, and it's good for, and framework-specific idiosyncracies.

## What is Next.js?

Next.js is a React based framework that blends together technologies of the client (browser) and server (nodejs).

### What does that mean?

It means that, assuming you are coming from a Single Page App (SPA)/Client Side Rendering (CSR) background, you will need to reframe how you think about approaching and implementing pages.

Specifically, it means approaching each page in an intentional manner to determine whether that page should be Static Site Generated (SSG) or Server Side Rendered (SSR).

- Read more: [SSG vs SSR](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)
- Read more: [Using CSR with SSG](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)

## What are Next.js-specific files & folders?

Understanding the folders and files with explicit responsibilities in a Next.js application is key to effectively developing the codebase. There are not a huge number of these specific items,  handful of unique files & folders used in a Next.js app. 

### What is `pages/`

All `.js` files under the `pages/` directory **that export a react component** (excluding `api/`, `_app.js` and `) will be turned into a route based on its path/file name.

[Page-based routing](https://nextjs.org/docs/basic-features/pages)

### What is `api/`

Similar to pages, any `.js` file under the `pages/api/` directory will be converted automatically into a route, but will be treated as an api endpoint rather than a page.

[Server-side API routes](https://nextjs.org/docs/api-routes/introduction)

### What is `_document.js`

The `_document.js` file is used to add content to the `html` or `body` tags of the document, as these are not otherwise exposed via Next.js rendering.

[Augment foundational markup](https://nextjs.org/docs/advanced-features/custom-document)

### What is `_app.js`

The `_app.js` file is used to override & control the page initialization for things like maintaining a global state, global css or other context providers, or error handling.

[Initialized pages](https://nextjs.org/docs/advanced-features/custom-app)

### What are bracket `[name].js` files?

The bracket-formatted files are dynamic routes, meaning routes that are defined based on some sort of external data fetching.

[Create dynamic routes](https://nextjs.org/docs/routing/dynamic-routes)

Additional note: [There are additional concerns](https://nextjs.org/docs/api-reference/next/link#dynamic-routes) that must be taken when using the `<Link />` component with dynamic links.

## What are Next.js-specific functions?

### getServerSideProps

Specifies a SSR page - content is pre-rendered, with any data fetching happening on render.

[Specify that a page is meant for SSR](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)

### getStaticProps

Specifies a SSG page - all content is pre-built, with any data fetching happening on build. 

[Specify that a page is meant for SSG](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)

### getStaticPaths

Required for static pages using dynamic routes, so that all routes are available to be constructed on build.

[Define dynamic paths (routes) for SSG pages](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)