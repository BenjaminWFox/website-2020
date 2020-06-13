import Head from 'next/head'
import { getAllPostIds } from '../lib/posts'

export default function Home({ params }) {
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

        {params.map((obj) => (
          <>
            <h2>
              {obj.params.slug}
            </h2>
            <p>
              other content here...
            </p>
          </>
        ))}
        {/* <h2>
          Next.js Setup & Config for Testing, Linting, and Absolute Imports
        </h2>
        <p>
          05/29/20 | A comprehensive step-by-step guide to configuring Jest, React Testing Library, ESLint, and Path Aliases in a Next.js project.
        </p>

        <h2>
          Creating a React Component Library by Abstracting a React Component Library
        </h2>
        <p>
          05/17/20 | Using Rollup, Babel, and React we’ll look at why & how you might abstract a third-party component library to create your own component...
        </p>

        <h2>
          Share state between screens with custom navigators in React Navigation
        </h2>
        <p>
          04/19/19 | Expose your React Navigation navigators for simple state sharing between any child screens in React Native.
        </p> */}

      </main>

      <footer>
        <sub>&copy; 2020 Benjamin W Fox</sub>
      </footer>
    </div>
  )
}

export const getStaticProps = ({ params }) => {
  // Const postData = getPostData(params.slug)
  console.log('HELLO')
  console.log(params)

  return {
    props: {
      params
    }
  }
}
