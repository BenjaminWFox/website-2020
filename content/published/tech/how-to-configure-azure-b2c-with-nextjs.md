---
title: "How to Configure Azure AD B2C Authentication with Next.js"
date: "2020-08-24"
subtitle: "Configuring authentication with Azure B2C in Next.js is not a particularly straight forward process. We'll look at how to facilitate this using the NextAuth.js library."
category: "tech"
image: 'images/blog/tech/how-to-configure-azure-b2c-with-nextjs/azure-b2c-next-js-config-title-image-2x1.jpg'
---

![](/images/blog/tech/how-to-configure-azure-b2c-with-nextjs/azure-b2c-next-js-config-title-image-2x1.jpg)

## Authentication with Azure B2C and Next.js

Authentication with [Next.js](https://nextjs.org/) is, at least for me, a bit of a nebulous problem, especially if development requirements are not 100% solidified. Since you have access to both the client and server(less) environments, you could handle authentication purely in the client, on the server, or with a mix of both.

Add in the task of configuring authentication with Azure B2C and complications are compounded. Azure AD B2C is many things but straight-forward is not one of them at least as far as I have found.

Please note that [Azure AD B2C](https://azure.microsoft.com/en-us/services/active-directory/external-identities/b2c/) is ***not*** the same thing as [Azure AD](https://azure.microsoft.com/en-us/services/active-directory/). Azure AD B2C (also referred to here as Azure B2C) is an identity & access management solution specifically for customer facing applications.

## Enter NextAuth.js

[NextAuth.js](https://next-auth.js.org/) is a framework that aims to make authentication with Next.js a (relatively) simple and painless process. After setting initial configuration values the heavy lifting is done for you via dynamic routes in Next.js. From there, you have the flexibility of setting & checking sessions on both the client and server.

## NextAuth + Azure B2C

Setting up Azure B2C for authentication with NextAuth, though, is still a bit of a process. It requires some initial setup & configuration in the Azure Portal, as well as a custom configuration in NextAuth.

My goal with this article is to detail all of the necessary steps to create a minimal authentication setup in Next.js using Azure B2C and NextAuth.js, and specifically to share the NextAuth configuration file I'm using. I'm not going to dive deep into the workings Azure B2C, Next.js, or NextAuth.

## Required Steps

1. [Example Repository](#example-repository)
2. [Set up Azure B2C](#set-up-configure-azure-ad-b2c)
3. [Create a Next.js App](#create-nextjs-app)
4. [Test the NextAuth Signin](#test-nextauth)
5. [Add Signout Functionality](#add-signout)

## <a id="example-repository"></a>[Example Repository](#example-repository)

If you want to go straight to the implementation, [take a look at the repository](https://github.com/BenjaminWFox/nextjs-azureb2c-nextauth) for the full code, as well as two different PRs showing [the initial diff to create basic working authentication](https://github.com/BenjaminWFox/nextjs-azureb2c-nextauth/pull/1/files), as well as [the diff to add signout functionality](https://github.com/BenjaminWFox/nextjs-azureb2c-nextauth/pull/3/files).

## <a id="set-up-configure-azure-ad-b2c"></a>[Set up Azure B2C](#set-up-configure-azure-ad-b2c)

### Create a Subscription and Azure AD B2C Tenant

This is probably the most complex part of the process. Since you're here, I'd assume that you already have access to an Azure subscription. Possibly even an Azure AD B2C Tenant...

BUT if one or the other of those are not the case [you will have to start here](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant), which will walk you through the process of creating a Subscription (as a prerequisite) if you don't have one, then through the process of creating hte Azure AD B2C Tenant.

> Pay special attention to the **Initial domain name** you create, which you will use in a later step for NextAuth configuration.

### Create an App Registration

Next up is [another walkthrough from Microsoft detailing how to create an App Registration](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga). This app registration, which lives within your Azure B2C Tenant, will be the authority that authenticates users and issues tokens.

> Pay special attention to the **Client ID** & **Client Secret** you create, which you will use in a later step for NextAuth configuration.

### Add Additional Redirect URIs

Go back to the **Authentication** section in the App Registration and add two additional Redirect URIs which will be used by NextAuth:
```
http://localhost:3000/api/auth/callback/azureb2c
http://localhost:3000/auth/signout
```

> Also make sure you checked the two checkboxes under 'Implicit grant'

### Create a User Flow

Ok...[one more walkthrough from Microsoft on creating the User Flow](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows). User Flows are the managed interfaces that users will use for signup, signin, profile editing, and password resets.

> Note that you may want to add additional properties to be either collected or returned from the user flow!

![shows extra properties selected when creating the User Flow, like Email Address (collected) and Email Addresses(returned)](/images/blog/tech/how-to-configure-azure-b2c-with-nextjs/azure-ad-b2c-user-flow-additional-properties.png)

The basic pre-generated user flows are enough to get started, but as needs evolve the user flows can be fully customized to provide any functionality desired during the registration/authentication process.

## <a id="create-nextjs-app"></a>[Create a Next.js App](#create-nextjs-app)

That should be all the setup & configuration needed on the Azure B2C side, so let's get a Next.js environment set up. I named mine `nextjs-azureb2c-nextauth` when I ran the following commands:

```
npx create-next-app
cd nextjs-azureb2c-nextauth
npm install next-auth
```

### Add NextAuth Config & Files

There are four files we need to create or modify in order to get this working which are the `.env`, `next.config.js`, `_app.js` and `[...nextauth].js` files. Then we'll update the `index.js` file to prove that it's working.

**`.env`**

To set this up, copy and rename (or just rename) the `.env.example` file in the root of the project to `.env`. You'll need to update this with four values from Azure B2C:
- **AUTH_CLIENT_ID** - The App Registration client id.
- **AUTH_CLIENT_SECRET** - The App Registration client secret. If you didn't save the value when you created it the first time, [just create a new one](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications?tabs=app-reg-ga#create-a-client-secret).
- **AUTH_TENANT_NAME** - The 'Initial domain name' from when you initially set up Azure B2C.
- **AUTH_TENANT_GUID** - The GUID of the B2C Tenant, it can be found in the "Directory + subscription" blade in the Azure top nav bar (<img style="vertical-align: text-top;" src="/images/blog/tech/how-to-configure-azure-b2c-with-nextjs/directory-subscription-icon-azure-b2c.png" />).
- **USER_FLOW** - The name of your signup/signin user flow, probably starting with B2C\_1\_

**`next.config.js`**

Next.js needs this file to read your `.env` values and provide them to the application. Create the file in the root of your project. It should look like:

```javascript
// next.config.js
require('dotenv').config()

module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET,
    AUTH_TENANT_NAME: process.env.AUTH_TENANT_NAME,
    AUTH_TENANT_GUID: process.env.AUTH_TENANT_GUID,
    JWT_SECRET: process.env.JWT_SECRET,
    USER_FLOW: process.env.USER_FLOW,
  }
}
```

[I'm not sure](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) the `require('dotenv').config()` is even required, but it isn't breaking anything at the moment.

**`_app.js`**

We have to wrap `pages/_app.js` in the NextAuth `Provider` component in order to have access to the session, and to provide NextAuth with the NEXTAUTH_URL, which is required. Update the file to look like:

```javascript
// pages/_app.js
import '../styles/globals.css'
import { Provider as AuthProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  const { session } = pageProps
  
  return (
    <AuthProvider options={{ site: process.env.NEXTAUTH_URL }} session={session}>
      <Component {...pageProps} />)
    </AuthProvider>
  )
}

export default MyApp
```

**`[...nextauth.js]`**

Finally we need to add our NextAuth configuration for Azure AD B2C to the [dynamic route file](https://nextjs.org/docs/routing/dynamic-routes). This lives in `pages/api/auth/[...nextauth].js`. For this basic example, you shouldn't need to make any changes to the options below - all of the Azure AD B2C tenant-specific customizations are pulled from `.env` variables.

```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'

const tenantName = process.env.AUTH_TENANT_NAME
const tenantGuid = process.env.AUTH_TENANT_GUID
const userFlow = process.env.USER_FLOW

const options = {
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signOut: '/auth/signout',
  },
  providers: [
    {
      id: 'azureb2c',
      name: 'Azure B2C',
      type: 'oauth',
      version: '2.0',
      debug: true,
      scope: 'offline_access openid',
      params: {
        grant_type: 'authorization_code',
      },
      accessTokenUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
      // requestTokenUrl: `https://login.microsoftonline.com/${process.env.AUTH_TENANT_GUID}/oauth2/v2.0/token`,
      authorizationUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize?response_type=code+id_token&response_mode=form_post`,
      profileUrl: 'https://graph.microsoft.com/oidc/userinfo',
      profile: (profile) => {
        console.log('THE PROFILE', profile)

        return {
          id: profile.oid,
          fName: profile.given_name,
          lName: profile.surname,
          email: profile.emails.length ? profile.emails[0] : null,
        }
      },
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      idToken: true,
      state: false,
    },
  ],
}

export default (req, res) => NextAuth(req, res, options)
```

### Some Notes

The `providers.id` string must match what you've used in your callback (Redirect URI) in Azure B2C, which for us was `http://localhost:3000/api/auth/callback/azureb2c`.

The `profile` property is used to map values returned from the authorization flow to the users token. Auzre AD B2C does some weird stuff, like returning an array of email addresses, so if you want any of these available make sure to understand the values that are coming back in the `profile` obejct and map them accordingly to the return properties.

The `state` property is false. I had some issues when NextAuth release v3 and this was enabled, [but it doesn't sound like disabling it should be a problem](https://github.com/nextauthjs/next-auth/issues/468).

See more details on [all the options for using a custom provider here](https://next-auth.js.org/configuration/providers#using-a-custom-provider).

## <a id="test-nextauth"></a>[Test the NextAuth Signin](#test-nextauth)

You *should* now (assuming you're running the project) be able to navigate to <a href="http://localhost:3000/api/auth/signin/azureb2c" target="_blank">http://localhost:3000/api/auth/signin/azureb2c</a> and run through the login flow! In order to actually test that it's working though, you can add a little code to your `pages/index.js` file to check for the session - [the `useSession` hook!](https://next-auth.js.org/getting-started/client#usesession)

```javascript
// pages/index.js
// ...
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/client'

export default function Home() {
  const [session, loading] = useSession()

  return ( //...
```

Then, anywhere else in the file you can add some conditional logic to show messaging based on whether or not there is a user session:

```jsx
// pages/index.js
// ...
{session ?
  <>
    <div className={styles.grid}>
    You are signed in!
    </div>
  </>
  : 
  <div>
    You are not signed in! <a style={{color: 'blue'}} href="/api/auth/signin">You must sign in to access documentation!</a>
  </div>
}
// ...
```

## <a id="add-signout"></a>[Add Signout Functionality](#add-signout)

NextAuth exposes a [SignOut](https://next-auth.js.org/getting-started/client#signout) function that we can leverage, but this will only clear the local session. If the user signs out via this method, then signs in again via Azure AD B2C, they will not be prompted to re-enter their credentials since a session in B2C still exists.

That may not be a problem for you 🤷‍♂️ but if it is you can call the Azure B2C signout url, then redirect the user to the NextAuth signout url. The B2C sign-out URL looks like: 
```
https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}/auth/signout
```

Wherever you want the user to be able to log out, you can include that in a link. If you don't need the full B2C signout, you can also call the NextAuth API signout route instead:

```javascript
// Addition to `index.js`
// Can also `useSession` to show only if signed in!
// ...
<div>
  <p>You are signed in! You can also sign out if you like.</p>
  <ul>
    <li>
      <a style={{color: 'blue'}} href="/api/auth/signout/azureb2c">Sign Out (API)</a>
    </li>
    <li>
      <a style={{color: 'blue'}} href={`https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/${process.env.USER_FLOW}/oauth2/v2.0/logout?post_logout_redirect_uri=${process.env.NEXTAUTH_URL}/auth/signout`}>Sign Out (FULL)</a>
    </li>
  </ul>
</div>
// ...
```

If you notice on the end of the url, we've specified the `post_logout_redirect_uri` set to `${process.env.NEXTAUTH_URL}/auth/signout` - so we also need to make another route to facilitate this. The `signOut` method only works on the client, so this can not be an API route, and it should not run on the server. Create the file at `pages/auth/signout.js`

```javascript
// pages/auth/signout.js
import { signOut } from 'next-auth/client'

export default function Signout() {
  if (typeof window !== 'undefined') {
    signOut({ callbackUrl: process.env.NEXTAUTH_URL })
  }

  return null
}
```

## And Is That It?

In theory you're all set...but given some of the idiosyncrasies I've experienced with Azure (and sometimes Next.js) maybe not? Hopefully this at least helps you in the right direction if you were also struggling with this integration. My experience so far with Azure AD B2C has not been particularly pleasant, but given that it's *significantly* cheaper than a lot of the alternatives out there I'll be sticking with it for the forseeable future.

## Issues? Questions? Comments?

Find me on Twitter — [@BenjaminWFox](http://twitter.com/benjaminwfox)