export default theme => ({
  aboutPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 1024,
      padding: theme.spacing(8, 2, 2, 2)
    }
  },
  aboutTitle: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.common.black,
    width: 250,
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
  aboutInfo: {
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
  logoSm: {
    width: '100%',
    '& svg': {
      width: '100%',
      height: 300
    },
    [theme.breakpoints.up('md')]: {
      width: '0%',
      height: 0
    }
  },
  boxInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoMd: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '100%'
    }
  },
  boxSm: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  boxMd: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'initial'
    }
  },
  aboutSubtitle: {
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.common.black,
    width: 250,
    [theme.breakpoints.up('md')]: {
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.3',
      letterSpacing: 'normal',
      textAlign: 'left',
      width: '100%'
    }
  }
})
