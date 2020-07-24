import { createUseStyles, useTheme } from 'react-jss'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Header from '@/components/header/header'

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
        <Header />
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '1rem',
        }}
        >
          <h1>
            About
          </h1>

          <div>
            What am I all about?
          </div>
        </div>
      </main>

      <footer className={classes.footer}>
        <sub>&copy; 2020 Benjamin W Fox</sub>
      </footer>
    </div>
  )
}

export const getStaticProps = async ({ params }) => ({
  props: {
    params: params || null,
  },
})

Home.propTypes = {
  postData: PropTypes.array.isRequired,
}
