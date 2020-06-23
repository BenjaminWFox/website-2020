import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  '@global': {
    html: {
      boxSizing: 'border-box',
      fontSize: '16px',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
      margin: 0,
      padding: 0,
      fontWeight: 'normal',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
    blockquote: {
      margin: 0,
    }
  }
})

export default function ResetStyles() {
  // eslint-disable-next-line
  const classes = useStyles()

  return null
}

// export default reset
