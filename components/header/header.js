import Link from 'next/link'
import { createUseStyles } from 'react-jss'
import { isProduction } from '@/lib/utility'

const useStyles = createUseStyles(() => ({
  root: {
    maxWidth: '780px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '150px',
    margin: '0 auto',
  },
  nav: {
    listStyleType: 'none',
    display: 'flex',
  }
}))

export default function Header() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <p style={{ fontSize: '2rem' }}>
        Ben Fox
      </p>
      <nav>
        <ul className={classes.nav}>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/about"><a>About</a></Link></li>
          {!isProduction() && <li><Link href="/blog/drafts"><a>Drafts</a></Link></li>}
        </ul>
      </nav>
    </div>
  )
}
