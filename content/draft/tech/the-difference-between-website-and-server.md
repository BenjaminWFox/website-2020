---
title: "Next.js vs Single Page vs Traditional Applications"
date: "2021-06-06"
subtitle: "From servers to no servers to serverless, what's the difference? Come for the intro and stay for the diagrams."
category: "tech"
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Initial image used as anchor for article](/public/images/blog/tech/why-isnt-npm-link-working/why-isnt-npm-link-working-title-image.jpg)

## Servers to No Servers to Serverless

In the beginning, there were servers.

The servers roamed the wild, waiting for clients and their connections, and when a server received a connection it would pounce. The servers liked the connections and held on to them, guarding them closely.

Thus the traditional web app was born.

But the clients grew tired of the servers, which were needy and clingy and flakey.

"Give us back our connections!" cried the clients.

"We will just stop by to grab all the things when we need them," the clients went on, "that's really all we need."

Thus the single page application was born.

But the clients grew lonely. They had no one to tell their secrets to, and no one to help with lifting heavy things.

"Maybe we could work out a friends with benefits kind of thing?" mused the clients.

The servers were into it.

Thus Next.js was born.

## Say What Now?

Ok, if the epic story of creation didn't do it, let's try again with pictures.

There are three main players in this story, the:
- Screen (or other interface) to drive input on the client
- Client (the browser) to interact with the server
- Server to send pages and data to the client

The client sends a request to the server for some stuff. The server sends that stuff back to the client. The client does things to it, and bam it's available to show to the screen.

Exactly what happens at each of those steps differs a little depending on whether you're talking about a traditional, spa, or Next.js (which more generally is a hybrid/serverless) application.

Let's dive in to a high level overview of what those differences are. In all cases, the first two steps and the final step are the same:

1. The screen triggers a page request
2. The client sends a page request to the server
3. ??
4. ??
5. Profit! The screen displays the page

So let's look at steps 3 and 4 for each application!

### Traditional Server App

![traditional app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/traditional-app.jpg)

3. Server grabs or builds the requested page
4. Client receives ready-to-display page

From here the process repeats itself. New page requested, new request fulfilled. In a traditional app servers were often stateful, and would use stored session data for each connection to build pages on each request. AJAX offered some additional flexibility but it never felt like a first-class citizen.

### Single Page App

![single page app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/single-page-app.jpg)

3. Server grabs a bundle of stuff (like JavaScript and CSS)
4. Client receives & processes the bundle to build pages

No more requests to the server need to be made *for pages*, which will all be built from the bundle that the browser now controls. Other requests might be made for data. These could be to the same server or to other APIs.

### Next.js App

![Next.js hybrid serverless app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/hybrid-serverless-app.jpg)

3. Server grabs or builds the requested page
4. Client receives a page that may requires some processing

Like the traditional app where new pages are requested from the server, but there is *a lot* more flexibility. Fetching new data has first-class support. The types of pages available on the server have explicitly defined options and can be entirely ready-to-serve or generated at request-time.

Like the single page app a page can also still have large portions that need to be processed on the client.

