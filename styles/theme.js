const tokens = {
  spacing: {
    xs3: '.125',
    xs2: '.25',
    xs: '.5rem',
    sm: '.75rem',
    base: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xl2: '2.5rem',
    xl3: '3rem'
  },
  layout: {
    base: '1rem',
    lg: '2rem',
    xl: '4rem',
    xl2: '8rem',
    xl3: '16rem',
  },
  typography: {},
  breakpoints: {
    queries: {
      mobileAndUp: '@media screen and (min-width: 320px)',
      tabletAndUp: '@media screen and (min-width: 672px)',
      desktopAndUp: '@media screen and (min-width: 1056px)',
      largeAndUp: '@media screen and (min-width: 1312px)',
      maxAndUp: '@media screen and (min-width: 1584px)',
    }
  }
}

const light = {
  id: 1,
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
  },
  layout: {
    ...tokens.layout,
  },
  breakpoints: {
    ...tokens.breakpoints,
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
  ids: {
    light: 1,
    dark: 2,
  }
}
