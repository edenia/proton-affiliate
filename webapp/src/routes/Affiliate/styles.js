export default theme => ({
  affiliatePage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 1024
    }
  },
  affiliateTitle: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: '#000000',
    display: 'initial',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  affiliateInfo: {
    fontWeight: '500',
    margin: theme.spacing(2, 0),
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
      margin: theme.spacing(3, 0, 5, 0)
    }
  },
  affiliateShare: {
    fontWeight: '500',
    width: '100%',
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    color: '#000000',
    display: 'initial',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  affiliateShareDesktop: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.15px',
    textAlign: 'center',
    color: '#000000',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'initial'
    }
  },
  affiliateLinkInfo: {
    margin: theme.spacing(2, 0),
    width: 260,
    '& .MuiButton-label': {
      fontWeight: '600',
      fontSize: 12,
      lineHeight: '16px',
      textAlign: 'center',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      color: '#000000',
      overflowWrap: 'anywhere'
    },
    [theme.breakpoints.up('md')]: {
      width: 400
    }
  },
  lastReferral: {
    marginTop: theme.spacing(4),
    height: 56,
    width: '100%',
    background: 'rgba(245, 247, 250, 0.74)',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3)
  },
  tableTitle: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  affiliateHead: {
    padding: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  popover: {
    '& .MuiPopover-paper': {
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      width: 250,
      padding: theme.spacing(1)
    }
  },
  popoverTypography: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '20px',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  affiliateTitleDesktop: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: 'normal',
    color: '#000000',
    display: 'none',
    textAlign: 'left',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'initial'
    }
  },
  shareButon: {
    color: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      color: '#fff',
      backgroundColor: theme.palette.primary.main
    }
  }
})
