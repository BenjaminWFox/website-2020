const light = {
  _id: 1,
  name: 'light',
  colors: {
    body: {
      primary: '#FFFFFF',
    },
    text: {
      primary: '#000000',
    }
  }
}

const dark = {
  _id: 2,
  name: 'dark',
  colors: {
    body: {
      primary: '#000000',
    },
    text: {
      primary: '#FFFFFF',
    }
  }
}

export const themes = {
  dark,
  light,
}
