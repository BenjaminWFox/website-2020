import Link from 'next/link'
import { createUseStyles } from 'react-jss'
import { isProduction } from '@/lib/utility'

const useStyles = createUseStyles((theme) => ({
  root: {
    maxWidth: '780px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '150px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.xs}`,
    [theme.breakpoints.queries.desktopAndUp]: {
      padding: 0,
    },
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
          <li><a href="https://github.com/BenjaminWFox" rel="noreferrer" target="_blank">GitHub</a></li>
          {!isProduction() && <li><Link href="/blog/drafts"><a>Drafts</a></Link></li>}
        </ul>
      </nav>
    </div>
  )
}
