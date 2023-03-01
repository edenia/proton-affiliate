export default theme => ({
  joinHead: {
    padding: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 1024,
      padding: theme.spacing(8, 2, 2, 2)
    }
  },
  joinPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  joinTitle: {
    width: 250,
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      fontSize: 40,
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.3',
      letterSpacing: 'normal',
      textAlign: 'left',
      color: theme.palette.common.black,
      width: '100%'
    }
  },
  joinInfo: {
    width: '100%',
    fontWeight: 'normal',
    marginTop: theme.spacing(2),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F',
    [theme.breakpoints.up('md')]: {
      fontSize: 21,
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.15px',
      textAlign: 'left'
    }
  },
  joinStep: {
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: theme.palette.common.black,
    width: '100%'
  },
  textField: {
    width: '100%',
    textTransform: 'lowercase',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 400
    }
  },
  helperText: {
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(18)
    }
  },
  step: {
    marginTop: theme.spacing(3),
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      '& p': {
        width: 435
      }
    },
    '& .MuiBox-root': {
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(16)
      }
    }
  },
  appleBtn: {
    margin: theme.spacing(1, 0),
    '& img': {
      width: 117
    },
    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.up('md')]: {
      '& img': {
        marginLeft: theme.spacing(2),
        width: 174
      }
    }
  },

  googleBtn: {
    margin: theme.spacing(1, 0),
    '& img': {
      width: 134
    },
    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.up('md')]: {
      '& img': {
        width: 195,
        marginLeft: theme.spacing(4)
      }
    }
  },
  congratsModal: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 2, 3),
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalTitle: {
    marginBottom: theme.spacing(4)
  },
  reward: {
    marginBottom: theme.spacing(2)
  },
  rewardInfo: {
    textAlign: 'center',
    marginBottom: theme.spacing(6)
  },
  moadalJoinBtn: {
    width: '100%'
  },
  showBox: {
    display: 'flex'
  },
  accountName: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.primary.main,
    margin: theme.spacing(1, 0)
  },
  sendBtn: {
    width: '100%',
    margin: theme.spacing(6, 0, 1, 0),
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  marginMd: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(11)
    }
  },
  marginLeft: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2)
    }
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(8),
      width: 300
    }
  },
  irreversibilityStatus: {
    marginTop: theme.spacing(2)
  },
  joinStepInfo: {
    width: '100%',
    fontWeight: 'normal',
    marginTop: theme.spacing(1),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F',
    [theme.breakpoints.up('md')]: {
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.15px',
      textAlign: 'left'
    }
  },
  checkWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(7)
    }
  },
  invalidIcon: {
    width: 64,
    height: 64,
    color: theme.palette.primary.main,
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(7),
      width: 200,
      height: 200
    }
  },
  invalidLink: {
    fontSize: 21,
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  invalidInfo: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.44px',
    textAlign: 'center',
    color: '#6B717F',
    marginTop: theme.spacing(3)
  },
  invalidBtn: {
    fontSize: 14,
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    marginTop: theme.spacing(10)
  },
  progress: {
    width: '100%',
    marginTop: theme.spacing(5)
  }
})
