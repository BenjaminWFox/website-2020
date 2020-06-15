import { JssProvider, SheetsRegistry, createGenerateId } from 'react-jss'
import Document from 'next/document'
import React from 'react'

/**
 * COPIED VERBATUM FROM:
 *
 * https://github.com/zeit/next.js/blob/canary/examples/with-react-jss/pages/_document.js
 *
 * This solves the `className` mistmatch issue on page refresh during development
 */

export default class JssDocument extends Document {
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
}
