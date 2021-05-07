import { createUseStyles, useTheme } from 'react-jss'
// import reset from './reset'

const useStyles = createUseStyles((theme) => ({
  '@global': {
    html: {
      fontFamily: 'Helvetica, Arial, Tahoma',
    },
    body: {
      backgroundColor: theme.colors.body.primary,
      color: theme.colors.text.secondary,
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
      overflowWrap: 'break-word',
    },
    '.markdown-body': {
      boxSizing: 'border-box',
      margin: '0 auto',
      maxWidth: '740px',
      minWidth: '320px',
      padding: theme.spacing.base,
      [theme.breakpoints.queries.tabletAndUp]: {
        padding: theme.layout.lg,
      },
      [theme.breakpoints.queries.desktopAndUp]: {
        padding: theme.layout.xl,
      },
      '& h1 + p': {
        fontSize: '1.5rem',
        fontStyle: 'italic',
        color: theme.colors.text.lightest,
      },
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        marginTop: '2rem',
        '& a, & a:hover, & a:visited, & a:active': {
          fontWeight: 'bold',
          color: 'inherit',
          textDecoration: 'none',
        },
        '& a:hover': {
          position: 'relative',
          '&::before': {
            position: 'absolute',
            opacity: 0.25,
            content: '"🔗"',
            left: '102%',
            right: 'auto',
            [theme.breakpoints.queries.tabletAndUp]: {
              left: 'auto',
              right: '101%',
            }
          }
        }
      },
    },
    'h1': {
      lineHeight: theme.spacing.xl2,
    },
    'h2, h3': {
      lineHeight: theme.spacing.xl,
    },
    'h1, h2, h3': {
      fontWeight: 400,
      marginBottom: theme.spacing.base,
      color: '#000',
    },
    'p, ul, ol': {
      marginBottom: theme.spacing.base,
    },
    a: {
      color: theme.colors.text.highlight,
      textDecoration: 'underline',
      '&:visited': {
        color: theme.colors.text.accent,
      },
      '&:hover': {
        textDecoration: 'none',
        color: theme.colors.text.active,
      },
      '&:active': {
        color: theme.colors.text.active,
      },
      // '&[target="_blank"]::after': {
      //   content: 'url(/images/icons/external-link-icon-blue.png)',
      //   margin: '0 3px 0 5px',
      // }
    },

    /* image */
    'p img': {
      align: 'center',
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
        '& > *:last-child': {
          marginBottom: theme.spacing.xs,
        }
      }
    },
    strong: {
      fontSize: '1rem',
    },
    blockquote: {
      borderLeft: '2px #ccc solid',
      fontWeight: '300',
      fontStyle: 'italic',
      paddingLeft: theme.spacing.lg,
      paddingRight: theme.spacing.xl1,
      marginLeft: theme.spacing.base,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      [theme.breakpoints.queries.tabletAndUp]: {
        paddingRight: theme.spacing.xl1,
        marginLeft: theme.spacing.lg,
      }
    },
    code: {
      lineHeight: '1rem',
    },
    pre: {
      '& code': {
        fontFamily: '"Courier New", monospace',
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
    },
    'p, li': {
      '& code': {
        fontFamily: 'monospace, "Courier New"',
        fontSize: '1em',
        backgroundColor: 'rgba(242, 242, 242, 1)',
        wordBreak: 'break-word',
        padding: '2px 4px',
      }
    }
  }
}))

export default function GlobalStyles() {
  // eslint-disable-next-line
  const classes = useStyles(useTheme())

  return null
}
