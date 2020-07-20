import Link from 'next/link'
import { createUseStyles, useTheme } from 'react-jss'

const useStyles = createUseStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '150px',
  },
  nav: {
    listStyleType: 'none',
    display: 'flex',
  }
}))

export default function Header() {
  const classes = useStyles(useTheme())

  return (
    <div className={classes.root}>
      <p style={{ fontSize: '2rem' }}>
        Hi, I&apos;m Ben
      </p>
      <nav>
        <ul className={classes.nav}>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/blog"><a>Blog</a></Link></li>
          <li><Link href="/blog/drafts"><a>Drafts</a></Link></li>
        </ul>
      </nav>
    </div>
  )
}
