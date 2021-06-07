---
title: "What's the difference between a Single Page and Server Backed Application"
# title: "What's the relationship between a website and a server"
date: "2021-06-06"
subtitle: "What's in a server(less) anyway? "
category: "tech"
canon: 'https://external.com?if=originally-published-elsewhere'
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

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

**In a Single Page Application**
- Browser sends request to server
- Server responds immediately with a bundle<sup>*</sup> of stuff
  - Mostly JavaScript, maybe some CSS
  - Probably *not* any HTML
- Browser receives the bundle and has to process it, executing JavaScript to generate HTML
- Browser renders HTML, css, etc...
- Browser does additional processing to render subsequent pages
  - The browser has all the context & awareness for the rest of the site
  - Additional data would be requested via APIs, rather than specific page requests

**In a Traditional Server Application:**
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
  - The server maintains an in-memory state for every session between requests

**In Next.js & Serverless Applications**
- *Almost* identical to the traditional app except the server *does not* maintain any in-memory state between requests

<sup>*</sup> "Bundle" is the common term for what is sent to the browser with a SPA architecture.

<!-->
Good overview: https://christianfindlay.com/2020/07/09/blazor-vs-traditional-web-apps/
<-->