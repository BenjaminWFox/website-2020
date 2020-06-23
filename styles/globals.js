import { createUseStyles, useTheme } from 'react-jss'
// import reset from './reset'

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
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Light.ttf\')',
        fontWeight: 'light',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-LightItalic.ttf\')',
        fontWeight: 'light',
        fontStyle: 'italic',
        fontDisplay: 'swap',
      },
    ],
    html: {
      fontFamily: 'Lato, Times New Roman',
    },
    body: {
      backgroundColor: theme.colors.body.primary,
      color: theme.colors.text.primary,
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
    },
    '.markdown-body': {
      boxSizing: 'border-box',
      margin: '0 auto',
      maxWidth: '680px',
      minWidth: '320px',
      padding: '45px',
    },
    'h1, h2, h3': {
      fontWeight: 'bold',
      lineHeight: theme.spacing.xl,
      marginBottom: theme.spacing.base,
    },
    // 'h1, h2, p': {
    //   '& + ul, & + ol': {
    //     marginTop: `-${theme.spacing.sm}`,
    //   }
    // },
    'p, ul, ol': {
      marginBottom: theme.spacing.base,
    },

    /* image caption */
    'p img ~ em': {
      textAlign: 'center',
      fontSize: '.75rem',
      display: 'block',
    },
    'ul, ol': {
      '& li': {
        marginLeft: theme.spacing.lg,
        '& *:last-child': {
          marginBottom: theme.spacing.xs,
        }
      }
    },
    blockquote: {
      borderLeft: '2px #ccc solid',
      fontWeight: '300',
      fontStyle: 'italic',
      paddingLeft: theme.spacing.lg,
    },
    pre: {
      overflow: 'scroll',
      '& code': {
        background: '#2b2b2b',
        color: '#f8f8f2',
        display: 'block',
        fontSize: '.875rem',
        lineHeight: '1.125rem',
        overflowX: 'auto',
        padding: '0.5em',
        '&:not([class])': {
          whiteSpace: 'pre-wrap',
        }
      }
    }
  }
}))

export default function GlobalStyles() {
  // eslint-disable-next-line
  const classes = useStyles(useTheme())

  return null
}
