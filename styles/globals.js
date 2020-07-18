import { createUseStyles, useTheme } from 'react-jss'
// import reset from './reset'

const useStyles = createUseStyles((theme) => ({
  '@global': {
    '@font-face': [
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Italic.ttf\')',
        fontWeight: '400',
        fontStyle: 'italic',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Regular.ttf\')',
        fontWeight: '400',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Bold.ttf\')',
        fontWeight: '700',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-Light.ttf\')',
        fontWeight: '300',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'Lato',
        src: 'url(\'/fonts/Lato-LightItalic.ttf\')',
        fontWeight: '300',
        fontStyle: 'italic',
        fontDisplay: 'swap',
      },
    ],
    html: {
      fontFamily: 'Lato, Times New Roman',
    },
    body: {
      backgroundColor: theme.colors.body.primary,
      color: theme.colors.text.secondary,
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
    },
    '.markdown-body': {
      boxSizing: 'border-box',
      margin: '0 auto',
      maxWidth: '680px',
      minWidth: '320px',
      padding: '45px',
      '& h1 + p': {
        fontSize: '1.5rem',
        fontStyle: 'italic',
        color: theme.colors.text.lightest,
      },
      '& h1, & h2, & h3': {
        '& a, & a:hover, & a:visited, & a:active': {
          color: 'inherit',
          textDecoration: 'none',
        },
        '& a:hover': {
          '&::after': {
            content: '" (link)"',
          }
        }
      }
    },
    'h1, h2, h3': {
      fontWeight: 400,
      lineHeight: theme.spacing.xl,
      marginBottom: theme.spacing.base,
      color: '#000',
    },
    // 'h1, h2, p': {
    //   '& + ul, & + ol': {
    //     marginTop: `-${theme.spacing.sm}`,
    //   }
    // },
    'p, ul, ol': {
      marginBottom: theme.spacing.base,
    },
    a: {
      color: theme.colors.text.highlight,
      textDecoration: 'none',
      '&:visited': {
        color: theme.colors.text.accent,
      },
      '&:hover': {
        textDecoration: 'underline',
        color: theme.colors.text.active,
      },
      '&:active': {
        color: theme.colors.text.active,
      },
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