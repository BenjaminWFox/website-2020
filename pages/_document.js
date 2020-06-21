import Document, { Head, Html, Main, NextScript } from 'next/document'
import { JssProvider, SheetsRegistry, createGenerateId } from 'react-jss'
import React from 'react'

/**
 * COPIED VERBATUM FROM:
 *
 * https://github.com/zeit/next.js/blob/canary/examples/with-react-jss/pages/_document.js
 *
 * This solves the `className` mistmatch issue on page refresh during development
 */

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const registry = new SheetsRegistry()
    const generateId = createGenerateId()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => (
        <JssProvider
          generateId={generateId}
          registry={registry}
        >
          <App {...props} />
        </JssProvider>
      ),
    })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    }
  }

  // render() {
  //   return (
  //     <Html lang="en">
  //       <Head>
  //         <link
  //           as="font"
  //           crossOrigin=""
  //           href="/fonts/Lato-Regular.ttf"
  //           rel="preload"
  //         />
  //       </Head>
  //       <body>
  //         <Main />
  //         <NextScript />
  //       </body>
  //     </Html>
  //   )
  // }
}
