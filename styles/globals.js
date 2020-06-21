import { createUseStyles, useTheme } from 'react-jss'
import reset from './reset'

const useStyles = createUseStyles((theme) => ({
  '@global': {
    '@font-face': [
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Italic.ttf\')',
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Regular.ttf\')',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Bold.ttf\')',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
    ],
    ...reset,
    html: {
      fontFamily: 'Lato, Times New Roman',
    },
    body: {
      backgroundColor: theme.colors.body.primary,
      color: theme.colors.text.primary,
    },
    '.markdown-body': {
      boxSizing: 'border-box',
      margin: '0 auto',
      maxWidth: '680px',
      minWidth: '200px',
      padding: '45px',
    }
  }
}))

export default function GlobalStyles() {
  // eslint-disable-next-line
  const classes = useStyles(useTheme())

  return null
}
