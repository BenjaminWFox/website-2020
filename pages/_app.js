// import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'react-jss'

const myThemeOne = {
  _id: 1,
  colorPrimary: 'green',
  colorSecondary: 'red',
}

const myThemeTwo = {
  _id: 2,
  colorPrimary: 'red',
  colorSecondary: 'green',
}

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = React.useState(myThemeOne)

  const handleChangeTheme = () => {
    if (theme._id === 1) {
      setTheme(myThemeTwo)
    }
    else {
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
    </ThemeProvider>
  )
}
