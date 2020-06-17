import { createUseStyles, useTheme } from 'react-jss'

const useStyles = createUseStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.colors.body.primary,
      color: theme.colors.text.primary,
    },
    '.markdown-body': {
      boxSizing: 'border-box',
      margin: '0 auto',
      maxWidth: '980px',
      minWidth: '200px',
      padding: '45px',
    }
  }
}))

export default function GlobalStyles() {
  const classes = useStyles(useTheme())

  return null
}
