import Document, { Html, Head, Main, NextScript } from 'next/document'
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

  render() {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,500;1,300;1,500&display=swap'

    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link href={fontUrl} rel="stylesheet" />
          <link
            href={fontUrl}
            media="print"
            onLoad="this.media='all'" rel="stylesheet"
          />

          <noscript>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,500;1,300;1,500&family=Source+Sans+Pro:ital,wght@0,300;0,600;1,300;1,600&display=swap" rel="stylesheet" />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
