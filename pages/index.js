import { createUseStyles, useTheme } from 'react-jss'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'

const useStyles = createUseStyles((theme) => ({
  text: {
    color: theme.colorPrimary,
  },
}))

export default function Home({ swapTheme }) {
  const classes = useStyles(useTheme())

  return (
    <div className={classes.text}>
      <Head>
        <title>Benjamin W Fox</title>
        <link
          href="/favicon.ico"
          rel="icon"
        />
      </Head>

      <main>
        <h3>
          Hi, I&apos;m Ben.
          <button
            onClick={swapTheme}
            type="button"
          >
            Change Theme
          </button>
        </h3>

        <h1>
          Page 2: <Link href="/blog/tech/blog-page"><a>Blog Page!</a></Link>
        </h1>
      </main>

    </div>
  )
}

export const getStaticProps = ({ params }) => ({
  props: {
    params: params || null,
  },
})

Home.propTypes = {}
