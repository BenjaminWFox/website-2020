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
            Hi, I&apos;m Ben
          </h1>

          <div>
            <p>
              I&apos;m a Seattle-based educator & software engineer with over 10 years of building web sites, web applications, APIs, games, and mobile applications.
              I&apos;ve worked variously as a contractor and FTE in both agencies and organizations, having written code for
              {' '}
              <a href="https://www.microsoft.com/en-us/" rel="noreferrer nofollow" target="_blank">Microsoft</a>,
              {' '}
              <a href="https://about.google/" rel="noreferrer nofollow" target="_blank">Google</a>,
              {' '}
              <a href="https://www.coinstar.com/" rel="noreferrer nofollow" target="_blank">Coinstar</a>,
              {' '}
              <a href="https://cutterbuck.com/" rel="noreferrer nofollow" target="_blank">Cutter &amp; Buck</a>,
              {' '}
              <a href="https://www.penguinrandomhouse.com/" rel="noreferrer nofollow" target="_blank">Penguin Random House</a>,
              {' '}
              <a href="https://www.washington.edu/" rel="noreferrer nofollow" target="_blank">The University of Washington</a>,
              {' '}
              <a href="https://alleninstitute.org/" rel="noreferrer nofollow" target="_blank">The Allen Institute</a>,
              {' '}
              and
              {' '}
              <a href="https://www.providence.org/" rel="noreferrer nofollow" target="_blank">Providence Health</a>
              {' '}
              among others.
            </p>
            <p>
              I lead teams working across all areas of the stack, and work primarily between infrastructure, front, and middle layers.
              As 🥳 as coding can be, I also throughly enjoy simplifying complex ideas, architectures, and flows via charts & diagrams;
              exchanging ideas & feedback during code reviews;
              and producing articles and documentation aimed at detailing complex and/or 😡 processes.
            </p>
            <p>Developing in my spare time I enjoy making casual games, and have participated in the
              {' '}
              <a href="https://js13kgames.com/" rel="noreferrer nofollow" target="_blank">js13kGames competition</a>
              {' '}
              both
              {' '}
              <a href="https://js13kgames.com/entries/offline-oect" rel="noreferrer nofollow" target="_blank">in 2018</a>
              {' '}
              and
              {' '}
              <a href="https://js13kgames.com/entries/row" rel="noreferrer nofollow" target="_blank">in 2019</a>
              {' '}
              creating browser-based games under 13kb.
            </p>
            <p>
              Not developing in my spare time I spend a lot of time outside (🏃🏻‍♂️ 🚴🏻‍♂️ 🏔) and whatever time is left split between a handful of other hobbies (📷 🎸 📚).
            </p>
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
