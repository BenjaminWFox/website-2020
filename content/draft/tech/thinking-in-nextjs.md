---
title: "How to think in NextJS for the SPA Developer"
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
- Where your data comes from
  - Self-contained (database, local files)
    - Internal APIs
      - Import, Don't Fetch
  - Downstream/3rd party APIs
- When your data comes from
  - Is it static/infrequently changing?
- How you build your pages
  - Where your data come from
  - How often does it change
  - Where is your page built
- Deployment Considerations
  - SSG vs Server/Hybrid

## Initial Section

In very simplified terms, a web browsers job is to translate raw HTML into human-consumable content. A browser is very good at this!

Of course it's not quite that simple. The browser *also* has to be able to interpret other data like JavaScript and CSS.

When you visit a URL in your browser it fetches all that data and then process it before displaying the final content on screen.

Importantly, the more data that the browser has to fetch and process the longer it will take to display the final content.

**In a traditional, server-backed application:**
- Browser sends request to server
- Server processes the request, which *may* look like
  - Additional processing (business logic, database i/o), and building out HTML dynamically
  - Grabbing a pre-built HTML file
- Server responds with HTML
- Browser receives and renders the HTML
- Browser makes *additional* requests to the server for subsequent pages
  - The browser has *no* context for the rest of the site

**SPA Flow**
- Browser sends request to server
- Server responds immediately with a bundle<sup>*</sup> of stuff
  - Mostly JavaScript, maybe some CSS
  - Probably *not* any HTML
- Browser receives the bundle and has to process it, executing JavaScript to generate HTML
- Browser renders HTML
- Browser does *additional* processing to render subsequent pages
  - The browser has *all* the context for the rest of the site

<sup>*</sup> "Bundle" is the common term for what is sent to the browser with a SPA architecture.

NextJS Flow

* Good overview: https://christianfindlay.com/2020/07/09/blazor-vs-traditional-web-apps/

