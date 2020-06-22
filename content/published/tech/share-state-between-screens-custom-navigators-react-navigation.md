---
title: "Share state between screens with custom navigators in React Navigation"
date: "2019-04-19"
subtitle: "Expose your React Navigation navigators for simple state sharing between any child screens in React Native."
category: "tech"
---

# Share state between screens with custom navigators in React Navigation

Expose your React Navigation navigators for simple state sharing between any child screens in React Native.

![](https://cdn-images-1.medium.com/max/5120/1*rVkhYjY_ug8nKb9rKroCyw.jpeg)

### **Update 1/7/2020:**

Please note that this was written with Expo 32.x & React-Navigation 3.x. I believe the same general ideas apply, but due to changes (modularization in particular) in the packages the code as-written will not be exactly the same.

I’ve been using React Navigation in my React Native projects lately and liking it a lot. It has all of the features I’ve needed and is relatively straight forward to work with out of the box. If you’re here you‘ve probably been working with it too, so I’m going to assume a basic working knowledge of both React Navigation and React Native.

Recently I ran into an annoying issue that took me a while to solve — the need to share of state between related screens in a navigator. In this instance, I had a StackNavigator with a number of screens that all operated on the same data.

This was a challenge because React Navigation doesn’t, by default, expose most of the navigators you’re creating as components that could be used directly in markup, so there is no obvious way to pass a state object down as a prop to child screens. A basic React Navigation implementation might look something like this:

<iframe src="https://medium.com/media/7c932c7f680f90cb2cd6ad2e8d513eab" frameborder=0></iframe>

In the above example MainTabNavigator is a React component, but explicitly rendering it is an [anti-pattern/common mistake](https://reactnavigation.org/docs/en/common-mistakes.html). By default, the only navigator that gets directly exposed to the markup is the root component AppContainer which is rendered in [App.js](https://github.com/BenjaminWFox/react-navigation-sharing-screen-state/blob/master/App.js).

So what if you wanted to go about sharing some state between all of the child screens of your MainTabNavigator?

You could manage that state wherever you render your AppContainer, but that might be very far removed from where your navigator actually resides.

Alternatively you could add a state management library like Redux or MobX, but that might be overkill and/or introduce unnecessary complexity.

Fortunately there is a third solution, which is to create a custom navigator. The custom navigator imports the built-in navigator and renders it as a normal component to which you can add additional props as needed.

The implementation of the custom navigator is actually fairly straight forward, but the details were spread across the documentation in a way that made it difficult for me to figure out what I needed to do.

[The full code for this project is on GitHub](https://github.com/BenjaminWFox/react-navigation-sharing-screen-state). It is a simplified version of the default Tabs app created with expo init via the Expo CLI, and all it does is keep track how many times a user has switched tabs.

The steps below assume you’ve started from a basic React Native app using React Navigation with a structure like the BasicReactNavigationSetup in the snippet above.

## **Step one**

Create the custom navigator. At its most basic, this component needs to do two things.

1. It needs to assign itself a router.

1. It needs to import and render the built-in navigator component.

**First **let’s set up a router to tell React Navigation how this custom navigator will function.
> Routers define a component’s navigation state, and they allow the developer to define paths and actions that can be handled. — [React Navigation](https://reactnavigation.org/docs/en/routers.html)

There is a pre-existing TabRouter in the MainTabNavigator and that is what we should use for our custom navigator. All of the paths and actions are already defined, and it will provide the same behavior as if we were using MainTabNavigator on its own.

<iframe src="https://medium.com/media/06de934372c50b1771a864a3f2af882e" frameborder=0></iframe>

**Second** we need to render MainTabNavigation while ensuring that it maintains access to the [navigation property](https://reactnavigation.org/docs/en/navigation-prop.html).

In the above snippet, we effectively cut off our MainTabNavigator from React Navigations navigation object, and our app will throw an error if we try to run it. We can fix that by explicitly assigning navigation to MainTabNavigator

<iframe src="https://medium.com/media/f3129f5baec5462c5affafb3c132ba61" frameborder=0></iframe>

If you prefer, you could accomplish the same thing by instead wrapping MainTabNavigator with the [withNavigation HOC](https://reactnavigation.org/docs/en/with-navigation.html).

## Step Two

Set up your state and pass some props.

We’ll update the custom navigator to create a counter that will track how many times tabs have been switched, and a method that increments the counter. We will pass both of these to MainTabNavigator as props so that any child screen can display the counter and trigger the increment when tabs are switched.

<iframe src="https://medium.com/media/f5f935b79497d0e299ea83e3bcc16fcf" frameborder=0></iframe>

The **gotcha **here is that the props can not be assigned directly on MainTabNavigator. In order for them to be correctly passed down to the screens they must be assigned via screenProps.

## Step Three

Properties assigned via screenProps can now accessed from any screen that is a child of MainTabNavigator.

We can use these to create a basic screen component that will display the number of times tabs have been switched, and trigger the increment function when tabbing to a new screen.

<iframe src="https://medium.com/media/2ea1c8b426d701a91f1db3b27a5d762d" frameborder=0></iframe>

## Thanks!
[**BenjaminWFox/react-navigation-sharing-screen-state**
*Contribute to BenjaminWFox/react-navigation-sharing-screen-state development by creating an account on GitHub.*github.com](https://github.com/BenjaminWFox/react-navigation-sharing-screen-state)

I hope you found this writeup useful. It’s the first piece I’ve published here, and I would welcome any thoughts on the content or suggestions for improvement!
