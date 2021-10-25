export default theme => ({
  commonTitle: {
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
      lineHeight: '1.37',
      letterSpacing: 'normal',
      textAlign: 'left',
      width: '100%'
    }
  },
  commonTitleInfo: {
    fontWeight: '500',
    margin: theme.spacing(2, 0, 6, 0),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F',
    [theme.breakpoints.up('md')]: {
      fontSize: 21,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.15px',
      textAlign: 'left',
      width: '100%'
    }
  },
  commonSubtitle: {
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: '27px',
    textAlign: 'left',
    letterSpacing: '0.15px',
    fontFamily: 'Roboto',
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.17',
      letterSpacing: 'normal',
      width: '100%'
    }
  },
  commonSubtitleInfo: {
    fontWeight: 'normal',
    margin: theme.spacing(2, 0),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#242424',
    [theme.breakpoints.up('md')]: {
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.5',
      letterSpacing: '0.44px',
      textAlign: 'left',
      width: '100%'
    }
  }
})
