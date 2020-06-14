import Head from 'next/head'
import PropTypes from 'prop-types'
import { buildPostManifest, } from '../lib/posts'

export default function Home({ postData, }) {
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
        </h3>

        <h1>
          Blog
        </h1>

        {postData.map((obj) => (
          <>
            <h2>
              <a href={`/blog/${obj.category}/${obj.slug}`}>{obj.title}</a>
            </h2>
            <p>
              {obj.subtitle}
            </p>
          </>
        ))}
      </main>

      <footer>
        <sub>&copy; 2020 Benjamin W Fox</sub>
      </footer>
    </div>
  )
}

export const getStaticProps = ({ params, }) => {
  const postData = buildPostManifest()

  return {
    props: {
      params: params || null,
      postData,
    },
  }
}

Home.propTypes = {
  postData: PropTypes.object.isRequired,
}
