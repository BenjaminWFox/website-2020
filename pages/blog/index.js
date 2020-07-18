import { createUseStyles, useTheme } from 'react-jss'
import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { getPostManifest } from '@/lib/posts'
import { postStatuses } from '@/lib/config'

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
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
        }}
        >
          <p style={{ fontSize: '2rem' }}>
            Hi, I&apos;m Ben
          </p>
        </div>

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
              key={post.slug}
            >
              <h2>
                <Link
                  as={`/blog/${post.meta.category}/${post.slug}`}
                  href={`/blog/${post.meta.category}/[slug]`}
                ><a>{post.meta.title}</a>
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
  const postsOfStatus = postStatuses.published
  const postData = await getPostManifest(postsToShow, postsOfStatus)

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
