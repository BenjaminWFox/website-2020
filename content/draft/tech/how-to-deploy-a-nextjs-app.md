---
title: "How to Deploy a Next.js application outside Vercel"
date: "1900-12-24"
subtitle: "A brief and informative blurb related to the post"
category: "tech"
canon: 'REMOVE THIS PROBABLY || https://external.com?if=originally-published-elsewhere'
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

## Initial Section


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
