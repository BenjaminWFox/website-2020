import { createUseStyles, useTheme } from 'react-jss'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { buildPostManifest } from '../lib/posts'

const useStyles = createUseStyles((theme) => ({
  text: {
    color: theme.colorPrimary,
  },
}))

export default function Home({ swapTheme, postData }) {
  const classes = useStyles(useTheme())

  return (
    <div className="container">
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
          Blog
        </h1>

        {postData.map((obj) => (
          <div
            className={classes.text}
            key={obj.slug}
          >
            <h2>
              <a href={`/blog/${obj.category}/${obj.slug}`}>{obj.title}</a>
            </h2>
            <p>
              {obj.subtitle}
            </p>
          </div>
        ))}
      </main>

      <footer>
        <sub>&copy; 2020 Benjamin W Fox</sub>
      </footer>
    </div>
  )
}

export const getStaticProps = ({ params }) => {
  const postData = buildPostManifest()

  return {
    props: {
      params: params || null,
      postData,
    },
  }
}

Home.propTypes = {
  postData: PropTypes.array.isRequired,
}
