export default theme => ({
  aboutPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 1024
    }
  },
  aboutTitle: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.common.black,
    width: 200,
    [theme.breakpoints.up('md')]: {
      fontSize: 40,
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
    fontWeight: '500',
    margin: theme.spacing(2, 0),
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
  logo: {
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: '90%'
    }
  },
  boxInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})
