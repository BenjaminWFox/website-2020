// import App from 'next/app'

import 'github-markdown-css'
import GlobalStyles from '../styles/globals.js'
import React from 'react'
import { ThemeProvider } from 'react-jss'
import { themes } from '../styles/theme'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = React.useState(themes.light)

  const handleChangeTheme = () => {
    if (theme._id === 1) {
      setTheme(themes.dark)
    }
    else {
      setTheme(themes.light)
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
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component
        swapTheme={handleChangeTheme}
        {...pageProps}
      />
    </ThemeProvider>
  )
}
