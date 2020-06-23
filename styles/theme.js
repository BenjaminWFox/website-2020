const tokens = {
  spacing: {
    '3xs': '.125',
    '2xs': '.25',
    xs: '.5rem',
    sm: '.75rem',
    base: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem'
  },
  typography: {}
}

const light = {
  _id: 1,
  name: 'light',
  colors: {
    body: {
      primary: '#FFFFFF',
    },
    // http://web-accessibility.carnegiemuseums.org/design/color/#:~:text=%E2%80%9CWCAG%20(Web%20Content%20Accessibility%20Guidelines,of%20at%20least%204.5%3A1.
    text: {
      primary: '#112e51',
      secondary: '#323a45',
      lighter: '#494440',
      lightest: '#5b616b',
      highlight: '#0071bc',
      active: '#046b99',
      accent: '#205493',
      danger: '#cd2026',
    }
  },
  spacing: {
    ...tokens.spacing,
  }
}

// const dark = {
//   _id: 2,
//   name: 'dark',
//   colors: {
//     body: {
//       primary: '#000000',
//     },
//     text: {
//       primary: '#FFFFFF',
//     }
//   }
// }

export const themes = {
  // dark,
  light,
}
