// Import App from 'next/app'
import { ThemeProvider, createUseStyles, useTheme } from 'react-jss'
import React from 'react'

const myThemeOne = {
  id: 1,
  colorPrimary: 'green',
  colorSecondary: 'red',
}

const myThemeTwo = {
  id: 2,
  colorPrimary: 'red',
  colorSecondary: 'green',
}

const App = ({ Component, pageProps }) => {
  const [
    theme,
    setTheme
  ] = React.useState(myThemeOne)

  const handleChangeTheme = (id) => {
    if (id === 1) {
      setTheme(myThemeTwo)
    } else {
      setTheme(myThemeOne)
    }
  }

  React.useEffect(() => {

    /**
     * Adapted for Hooks from:
     *
     * https://github.com/zeit/next.js/blob/canary/examples/with-react-jss/pages/_app.js
     *
     * This solves the `className` mistmatch issue on page refresh during development
     */

    const style = document.getElementById('server-side-styles')

    if (style) {
      style.parentNode.removeChild(style)
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Component
        swapTheme={handleChangeTheme}
        {...pageProps}
      />
    </ThemeProvider>)
}

/*
 * Only uncomment this method if you have blocking data requirements for
 * every single page in your application. This disables the ability to
 * perform automatic static optimization, causing every page in your app to
 * be server-side rendered.
 *
 * MyApp.getInitialProps = async (appContext) => {
 *   // calls page's `getInitialProps` and fills `appProps.pageProps`
 *   const appProps = await App.getInitialProps(appContext);
 *
 *   return { ...appProps }
 * }
 */

export default App
