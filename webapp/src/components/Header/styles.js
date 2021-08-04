export default theme => ({
  appBar: {
    backgroundColor: `${theme.palette.background.paper}`,
    boxShadow: `${theme.shadows[0]}`,
    [theme.breakpoints.up('md')]: {
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
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  mobileSection: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  imageSm: {
    display: 'initial',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  imageMd: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'initial'
    }
  },
  navBar: {
    display: 'flex',
    '& .MuiListItemText-primary': {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '16px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: '#121212'
    }
  }
})
