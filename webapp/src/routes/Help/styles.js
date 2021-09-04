export default theme => ({
  helpPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 1024,
      padding: theme.spacing(8, 2, 2, 2)
    }
  },
  helpTitle: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      fontSize: 38,
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.3',
      letterSpacing: 'normal',
      textAlign: 'left',
      width: '100%'
    }
  },
  helpInfo: {
    fontWeight: '500',
    margin: theme.spacing(2, 0, 5, 0),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F',
    [theme.breakpoints.up('md')]: {
      fontSize: 21,
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.15px',
      textAlign: 'left',
      width: '100%'
    }
  },
  boxLinks: {
    display: 'flex',
    marginTop: theme.spacing(3),
    '& a': {
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '& svg': {
      marginRight: theme.spacing(3)
    },
    '& p': {
      marginTop: 0
    }
  },
  helpSubtitle: {
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: '27px',
    textAlign: 'left',
    letterSpacing: '0.15px',
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.3',
      letterSpacing: 'normal',
      width: '100%'
    }
  },
  helpSubinfo: {
    fontWeight: 'normal',
    margin: theme.spacing(2, 0),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F',
    [theme.breakpoints.up('md')]: {
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.15px',
      textAlign: 'left',
      width: '100%'
    }
  },
  svgIcon: {
    color: '#e0e0e0',
    width: 36,
    height: 36
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  textUpper: {
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  protonIcon: {
    marginLeft: -7,
    marginRight: 6
  },
  links: {
    color: theme.palette.common.black
  }
})
