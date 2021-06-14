---
title: "How Does a Website Get its Data?"
date: "2021-06-14"
subtitle: "From servers to no servers to serverless, what's the difference and how does it impact how the client gets data?"
category: "tech"
image: 'images/blog/tech/server-no-server-serverless-apps/princess-bride-serverless-meme.jpg'
tags: "web development, web sites, review"
---

![Princess Bride "serverless does not mean what you think it means" meme.](/public/images/blog/tech/server-no-server-serverless-apps/princess-bride-serverless-meme.jpg)

## [Servers to No Servers to Serverless](#servers-to-no-servers-to-serverless)

In the beginning, there were servers.

The servers roamed the wild, waiting for clients and their connections, and when a server received a connection it would pounce. The servers liked the connections and held on to them, guarding them closely.

Thus the traditional web app was born.

But the clients grew tired of the servers, which were needy and somehow both clingy *and* flakey.

"Give us back our connections!" cried the clients, "On our terms!"

"We will just stop by to grab all the things when we need them," the clients went on, "that's really all we need."

Thus the single page application was born.

But the clients grew lonely. They had no one to tell their secrets to, and no one to help rearrange the furniture.

"Maybe we could work out a friends with benefits kind of thing?" mused the clients.

The servers were into it.

Thus Next.js was born.

## [Say What Now?](#say-what-now)

Ok, if the epic story of creation didn't do it, let's try again with pictures.

I've been building on the web for what feels like a long time, and I haven't reviewed the basics of how a site works in recent memory. I've been working with Next.js a lot over the last year, and I thought I'd write some notes to refresh my memory on how my sites used to work, and how they work now.

The story of each application had three main players, the:
- Screen (or other interface) to drive input on the client
- Client (the browser) to interact with the server to get data
- Server to send data to the client

The client sends a request to the server for some stuff. The server sends that stuff back to the client. The client does things to it, and ***bam*** it's available to show on the screen.

Exactly what happens at each of those steps differs a little depending on whether you're talking about a traditional, single page, or hybrid/serverless (like Next.js) application.

Let's dive in to a high level overview of what those differences are. In all cases, the first two steps and the final step are the same:

1. The screen triggers a page request
2. The client sends a page request to the server
3. ??
4. ??
5. Profit! The screen displays the page

So let's look specifically at steps 3 and 4 for each application!

### [Traditional Server App](#traditional-server-app)

![traditional app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/traditional-app.jpg)

3. Server grabs or builds the requested page
4. Client receives ready-to-display page

This process will repeat itself every time. New page requested, new request fulfilled. In a traditional app servers are *also* often stateful, so could remember details about a specific connection *in between* requests, and use that stored information for each connection to build pages on subsequent requests.

Page loads can be slow and unoptimized, and the UI refreshes for all transitions. [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) offered some additional flexibility but it was clunky to implement and rarely felt like a first-class citizen.

### [Single Page App](#single-page-app)

![single page app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/single-page-app.jpg)

3. Server grabs a bundle of stuff (like JavaScript and CSS)
4. Client receives & processes the bundle to build pages

Right up front the client has grabbed *everything* it needs, for better or worse. No more requests to the server need to be made *for pages*, which will all be built from the bundle that the browser now controls. Other requests might be made for data, either from the same server or other APIs.

Bundles can grow quite large, increasing load times and degrading user experience. Bundle splitting was one solution to that problem, but it could get complex and was often poorly implemented, if at all.

### [Next.js or Hybrid App](#nextjs-or-hybrid-app)

![Next.js hybrid serverless app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/hybrid-serverless-app.jpg)

3. Server grabs or builds the requested page
4. Client receives a page that may requires some processing

First a note on *serverless*, which only means that the servers are run and maintained by a 3rd party. The term is commonly used in tandem with hybrid apps, but it's just a reference to how they're deployed. One way or another, there are still servers involved.

The hybrid app is like the traditional app where new pages are requested from the server, but there is *a lot* more flexibility, hence the "hybrid" designation. Fetching new data has first-class support. The types of pages available on the server have explicitly defined options and can be entirely ready-to-serve or generated at request-time. 

Like the single page app, a page in hybrid applications like Next.js can also still have large portions that need to be processed on the client.

This flexibility comes with increased complexity, and unlike the traditional app, this server is *not* stateful. It knows nothing about a connection except what is provided in the incoming request.

## [At the End](#at-the-end)

None of these approaches are inherently better or worse than the others, and don't let anyone tell you otherwise. All have pros and cons. One may work better for a particular use case than another, but that will depend on project-specific requirements, so you'll have to do your homework once you determine what those are.

And you should ***definitely*** determine your requirements up front! 😉

The first time I lobbied to build a site with Next.js I ended up stripping it out a month later 🤦‍♂️ it became clear that there was actually only a single page with different sections of the page that changed at certain times, so back to the single page app I went!

## [Further Reading](#further-reading)

If you're just getting started with Next.js, check out my thoughts on [How to Think in Next.js]().

If you're setting up a new project, check on my tutorial on [Next.js setup with tests, linting, and absolute imports](https://benjaminwfox.com/blog/tech/nextjs-setup-config-testing-linting-absolute-imports).

Good luck and happy programming!

## [Questions? Comments?](#questions-comments)

Follow me on Twitter [@BenjaminWFox](https://twitter.com/BenjaminWFox) for more tech and leadership content, and reach out with any thoughts or questions!
