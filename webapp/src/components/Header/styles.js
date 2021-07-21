export default theme => ({
  appBar: {
    backgroundColor: `${theme.palette.background.paper}`,
    boxShadow: `${theme.shadows[0]}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: `${theme.shadows[4]}`,
      borderBottom: 0
    }
  },
  toolbar: {
    padding: 0,
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing(0, 2)}`
    }
  },
  typography: {
    color: `${theme.palette.text.primary}`,
    flexGrow: 1
  },
  desktopSection: {
    display: 'none',
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto 7px auto',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  mobileSection: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})
