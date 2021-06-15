---
title: "Share state between screens with custom navigators in React Navigation"
date: "2019-04-19"
subtitle: "Expose your React Navigation navigators for simple state sharing between any child screens in React Native."
category: "tech"
canon: "https://benjaminwfox.medium.com/share-state-between-screens-with-custom-navigators-in-react-navigation-62a34e3c7f97"
tags: "react native, react, state, tutorial"
---

![A collection of fruits and vegetables that have been cut in half and stapled back together differently, appearing like 2-part wholes of different items.](https://cdn-images-1.medium.com/max/5120/1*rVkhYjY_ug8nKb9rKroCyw.jpeg)

> **Update 1/7/2020:**
> Please note that this was written with Expo 32.x & React-Navigation 3.x. I believe the same general ideas apply, but due to changes (modularization in particular) in the packages the code as-written will not be exactly the same.

> **Update 6/14/2021:**
> React Native links updated to point to 3.x documentation.

I’ve been using React Navigation in my React Native projects lately and liking it a lot. It has all of the features I’ve needed and is relatively straight forward to work with out of the box. If you’re here you‘ve probably been working with it too, so I’m going to assume a basic working knowledge of both React Navigation and React Native.

Recently I ran into an annoying issue that took me a while to solve — the need to share of state between related screens in a navigator. In this instance, I had a StackNavigator with a number of screens that all operated on the same data.

This was a challenge because React Navigation doesn’t, by default, expose most of the navigators you’re creating as components that could be used directly in markup, so there is no obvious way to pass a state object down as a prop to child screens. A basic React Navigation implementation might look something like this:

```js
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

export const MainTabNavigator = createBottomTabNavigator({
  HomeScreen,
  LinksScreen,
  SettingsScreen,
})

export default createAppContainer(MainTabNavigator);
```

In the above example MainTabNavigator is a React component, but explicitly rendering it is an [anti-pattern/common mistake](https://reactnavigation.org/docs/3.x/common-mistakes/#explicitly-rendering-more-than-one-navigator). By default, the only navigator that gets directly exposed to the markup is the root component AppContainer which is rendered in [App.js](https://github.com/BenjaminWFox/react-navigation-sharing-screen-state/blob/master/App.js).

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

**First** let’s set up a router to tell React Navigation how this custom navigator will function.
> Routers define a component’s navigation state, and they allow the developer to define paths and actions that can be handled. — [React Navigation](https://reactnavigation.org/docs/3.x/routers)

There is a pre-existing TabRouter in the MainTabNavigator and that is what we should use for our custom navigator. All of the paths and actions are already defined, and it will provide the same behavior as if we were using MainTabNavigator on its own.

```js
import React from 'react'
import { MainTabNavigator } from './BasicReactNavigationSetup'

class CustomReactNavigationNavigatorSimple extends React.Component {
  static router = MainTabNavigator.router

  render() {
    return (
      <MainTabNavigator />
    )
  }
}

export default CustomReactNavigationNavigatorSimple
```

**Second** we need to render MainTabNavigation while ensuring that it maintains access to the [navigation property](https://reactnavigation.org/docs/3.x/navigation-prop/).

In the above snippet, we effectively cut off our MainTabNavigator from React Navigations navigation object, and our app will throw an error if we try to run it. We can fix that by explicitly assigning navigation to MainTabNavigator

```js
import React from 'react'
import { MainTabNavigator } from './BasicReactNavigationSetup'

class CustomReactNavigationNavigatorSimple extends React.Component {
  static router = MainTabNavigator.router

  render() {
    const { navigation } = this.props

    return (
      <MainTabNavigator navigation={navigation} />
    )
  }
}

export default CustomReactNavigationNavigatorSimple
```

If you prefer, you could accomplish the same thing by instead wrapping MainTabNavigator with the [withNavigation HOC](https://reactnavigation.org/docs/3.x/with-navigation/).

## Step Two

Set up your state and pass some props.

We’ll update the custom navigator to create a counter that will track how many times tabs have been switched, and a method that increments the counter. We will pass both of these to MainTabNavigator as props so that any child screen can display the counter and trigger the increment when tabs are switched.

```js
import React from 'react'
import { MainTabNavigator } from './BasicReactNavigationSetup'

class CustomReactNavigationNavigator extends React.Component {
  static router = MainTabNavigator.router

  state = {
    timesTabbed: 0
  }

  componentDidMount = () => {
    const { navigation } = this.props

    navigation.addListener('didFocus', this.incrementTimesTabbed)
  }

  incrementTimesTabbed = () => {
    const { timesTabbed } = this.state

    this.setState({ timesTabbed: timesTabbed + 1 })
  }

  render() {
    const { timesTabbed } = this.state

    return (
      <MainTabNavigator
        navigation={this.props.navigation}
        screenProps={{
          tabCounter: timesTabbed,
          onDidTab: this.incrementTimesTabbed,
        }}
      />
    )
  }
}

export default CustomReactNavigationNavigator
```

The **gotcha** here is that the props can not be assigned directly on MainTabNavigator. In order for them to be correctly passed down to the screens they must be assigned via screenProps.

## Step Three

Properties assigned via screenProps can now accessed from any screen that is a child of MainTabNavigator.

We can use these to create a basic screen component that will display the number of times tabs have been switched, and trigger the increment function when tabbing to a new screen.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationEvents } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default class BaseScreen extends React.Component {
  render() {
    const { tabCounter, onDidTab } = this.props.screenProps
      || { tabCounter: null, onDidTab: () => null }
    const { screenName } = this.props

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidBlur={onDidTab}
        />
        <Text>Hi from the {screenName} Screen</Text>
        <Text>You've tabbed {tabCounter} times.</Text>
      </View>
    );
  }
}
```

## Thanks!
[BenjaminWFox/react-navigation-sharing-screen-state](https://github.com/BenjaminWFox/react-navigation-sharing-screen-state)

I hope you found this writeup useful. It’s the first piece I’ve published here, and I would welcome any thoughts on the content or suggestions for improvement!
