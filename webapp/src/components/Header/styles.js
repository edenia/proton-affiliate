export default theme => ({
  appBar: {
    backgroundColor: `${theme.palette.background.paper}`,
    marginTop: theme.spacing(2),
    boxShadow: `${theme.shadows[0]}`,
    [theme.breakpoints.up('md')]: {
      borderBottom: 0,
      display: 'flex',
      alignItems: 'center'
    }
  },
  toolbar: {
    padding: theme.spacing(0, 3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      padding: 0,
      width: 1024
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
      display: 'flex',
      justifyContent: 'flex-end',
      width: 600
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
    width: '80%',
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
  },
  iconButton: {
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      '& svg': {
        marginRight: theme.spacing(1)
      }
    }
  },
  menuIcon: {
    color: theme.palette.common.black
  },
  noHover: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  btnLogin: {
    borderRadius: 0
  }
})
