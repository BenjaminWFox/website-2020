import React from 'react'
import PropTypes from 'prop-types'
import { getTribbles } from '../../../../api/tribble'
import Head from 'next/head'
import Header from '@/components/header/header'
import { createUseStyles, useTheme } from 'react-jss'


const useStyles = createUseStyles((theme) => ({
  tribbles: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tribble: {
    border: '1px #111 solid',
    margin: '20px',
    padding: '20px',
    width: '300px',
  },
  tImage: {
    height: '120px',
    width: '120px',
    margin: '0 auto',
  },
  tText: {
    fontFamily: 'Rockwell, Consolas, Georgia, Times, "Times New Roman", serif;',
    fontSize: '.75rem',
    lineHeight: '1rem',
    '& > *': {
      marginTop: '10px',
    }
  },
  tStatus: {
    textAlign: 'center',
    border: '1px #999 solid',
    padding: '10px',
    display: 'block',
    textDecoration: 'none',
    cursor: 'pointer',
    '&$available:hover': {
      color: '#fff',
    },
    '&$claimed:hover': {
      color: theme.colors.text.secondary,
    }
  },
  available: {
    color: '#fff',
    backgroundColor: '#d036ff',
    '& $c': {
      display: 'none',
    }
  },
  claimed: {
    backgroundColor: '#fff',
    color: theme.colors.text.secondary,
    fontWeight: 600,
    '& $a': {
      display: 'none',
    }
  },
  a: {},
  c: {},
  loaders: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      width: '200px',
      backgroundColor: '#fff',
      border: '1px #111 solid',
      padding: '20px',
      margin: '20px',
      cursor: 'pointer',
    }
  }
}))

export default function DisplayTribbles({ data, page, per, baseUrl, seen }) {
  const [tribbles, setTribbles] = React.useState([data])
  const [currentPage, setCurrentPage] = React.useState(page)
  const [indexesSeen, setIndexesSeen] = React.useState(seen)
  const classes = useStyles(useTheme())

  const addMoreTribbles = (arr) => {
    setTribbles((currentTribbles) => {
      const newArr = []

      currentTribbles.forEach((tArr) => {
        newArr.push(tArr)
      })

      newArr.push(arr)

      return newArr
    })

  }

  async function handleLoadMoreOrdered() {
    const pageToLoad = currentPage + 1
    const response = await fetch(`${baseUrl}/api/tribble?page=${pageToLoad}&per=${per}&seen=${indexesSeen.join(',')}`, {
      method: 'GET',
      headers: `{ "Origin": ${process.env.NEXT_PUBLIC_SITE_ROOT}}`
    })
    const result = await response.json()

    setIndexesSeen(result.seen)
    addMoreTribbles(result.data)
    setCurrentPage(pageToLoad)
  }

  async function handleLoadMoreRandom() {
    const response = await fetch(`${baseUrl}/api/tribble?per=${per}&seen=${indexesSeen.join(',')}`, {
      method: 'GET',
      headers: `{ "Origin": ${process.env.NEXT_PUBLIC_SITE_ROOT}}`
    })
    const resultObj = await response.json()

    setIndexesSeen(resultObj.seen)
    addMoreTribbles(resultObj.data)
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
        <div className={classes.tribbles}>
          {tribbles.map((d) => d.map((tdata) => (
            <div className={classes.tribble} key={tdata.token_id}>
              <div className={classes.tImage}><img src={tdata.metadata.media} /></div>
              <hr />
              <div className={classes.tText}>
                <div><strong>{tdata.token_id}</strong></div>
                <div>Current Owner:<br />{tdata.owner_id}</div>
                <a
                  className={[classes.tStatus, `${tdata.owner_id === 'need-find-tribbles-js13k.testnet' ? classes.available : classes.claimed}`].join(' ')}
                >
                  <span className={classes.a}>Available To Claim <br /> (if you can find it!)</span>
                  <span className={classes.c}>Already Claimed <br /> (but there may be others!)</span>
                </a>
              </div>
            </div>
          )))}
        </div>
        <div className={classes.loaders}>
          <button onClick={handleLoadMoreOrdered} type="button">Load More In Order</button>
          <button onClick={handleLoadMoreRandom} type="button">Load More At Random</button>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const page = 1
  const per = 10
  const { result, seen } = await getTribbles(page, per)
  const baseUrl = process.env.SITE_ROOT
  const data = result

  return {
    props: {
      baseUrl,
      data,
      page,
      seen,
      per
    }
  }
}

DisplayTribbles.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  per: PropTypes.number.isRequired,
}
