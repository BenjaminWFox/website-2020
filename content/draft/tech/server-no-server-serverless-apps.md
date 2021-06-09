---
title: "Next.js vs Single Page vs Traditional Applications"
date: "2021-06-06"
subtitle: "From servers to no servers to serverless, what's the difference? Come for the intro and stay for the diagrams."
category: "tech"
image: 'images/blog/tech/post-folder/image-name.jpg'
---

![Princess Bride "serverless does not mean what you think it means" meme.](/public/images/blog/tech/server-no-server-serverless-apps/princess-bride-serverless-meme.jpg)

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

The client sends a request to the server for some stuff. The server sends that stuff back to the client. The client does things to it, and ***bam*** it's available to show on the screen.

Exactly what happens at each of those steps differs a little depending on whether you're talking about a traditional, single page, or Next.js (which can more generally be called a hybrid/serverless) application.

Let's dive in to a high level overview of what those differences are. In all cases, the first two steps and the final step are the same:

1. The screen triggers a page request
2. The client sends a page request to the server
3. ??
4. ??
5. Profit! The screen displays the page

So let's look specifically at steps 3 and 4 for each application!

### Traditional Server App

![traditional app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/traditional-app.jpg)

3. Server grabs or builds the requested page
4. Client receives ready-to-display page

This process will repeat itself every time. New page requested, new request fulfilled. In a traditional app servers were *also* often stateful, using stored session data for each connection to build pages on each request.

Page loads were often slow and unoptimized. AJAX offered some additional flexibility but it was clunky to implement and rarely felt like a first-class citizen.

### Single Page App

![single page app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/single-page-app.jpg)

3. Server grabs a bundle of stuff (like JavaScript and CSS)
4. Client receives & processes the bundle to build pages

Right up front the client has grabbed *everything* it needs, for better or worse. No more requests to the server need to be made *for pages*, which will all be built from the bundle that the browser now controls. Other requests might be made for data, either from the same server or other APIs.

Bundles can grow quite large, increasing load times and degrading user experience. Bundle splitting was one solution to that problem, but it could get complex and was often poorly implemented, if at all.

### Next.js App

![Next.js hybrid serverless app flow diagram](/public/images/blog/tech/server-no-server-serverless-apps/hybrid-serverless-app.jpg)

3. Server grabs or builds the requested page
4. Client receives a page that may requires some processing

Like the traditional app where new pages are requested from the server, but there is *a lot* more flexibility. Fetching new data has first-class support. The types of pages available on the server have explicitly defined options and can be entirely ready-to-serve or generated at request-time. 

Like the single page app a page can also still have large portions that need to be processed on the client.

This flexibility comes with increased complexity, and unlike the traditional app, this server is *not* stateful. It knows nothing about a connection except what is provided in the incoming request.

## At the End

None of these approaches are inherently better or worse than the others, and don't let anyone tell you otherwise. All have pros and cons. One may work better for a particular usecase than another, but you'll have to do your homework once you determine your specific requirements.

And you should ***definitely*** determine your requirements up front 😉

## Further Reading

If you're just getting started with Next.js, check out my thoughts on [How to Think in Next.js]().

If you're setting up a new project, check on my tutorial on [Next.js setup with tests, linting, and absolute imports](https://benjaminwfox.com/blog/tech/nextjs-setup-config-testing-linting-absolute-imports).

Good luck and happy programming!

## Questions? Comments?

Follow me on Twitter [@BenjaminWFox](https://twitter.com/BenjaminWFox) for more tech and leadership content, and reach out with any thoughts or questions!
