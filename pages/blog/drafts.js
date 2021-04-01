import { createUseStyles, useTheme } from 'react-jss'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Header from '@/components/header/header'
import { getPostManifest } from '@/lib/posts'
import { postStatuses } from '@/lib/config'
import { isProduction } from '@/lib/utility'
import Error404 from '@/components/errors/404/404'

const useStyles = createUseStyles((theme) => ({
  text: {
    color: theme.colorPrimary,
  },
  footer: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

export default function Home({ postData }) {
  const classes = useStyles(useTheme())

  if (isProduction()) {

    return <Error404 />
  }

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
        <Header />

        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '1rem',
        }}
        >
          <h1>
            Blog
          </h1>

          {postData.map((post) => (
            <div
              className={classes.text}
              key={post.name}
            >
              <h2>
                <Link
                  as={`/blog/draft/${post.meta.category}/${post.name}`}
                  href={`/blog/draft/${post.meta.category}/[slug]`}
                ><a>{post.meta.title || post.name}</a>
                </Link>
              </h2>
              <p>
                {post.meta.subtitle}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </main>

      <footer className={classes.footer}>
        <sub>&copy; 2020 Benjamin W Fox</sub>
      </footer>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const postsToShow = 4
  const postsOfStatus = postStatuses.draft
  const postData = await getPostManifest(postsToShow, postsOfStatus)

  console.log('gSP.', postData)

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
