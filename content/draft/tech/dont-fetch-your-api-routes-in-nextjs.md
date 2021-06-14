---
title: "Don't fetch Your API Routes in Next.js"
date: "1900-12-24"
subtitle: "A brief and informative blurb related to the post"
category: "tech"
canon: 'REMOVE THIS PROBABLY || https://external.com?if=originally-published-elsewhere'
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

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


## Initial Section