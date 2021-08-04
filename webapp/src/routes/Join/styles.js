export default theme => ({
  joinHead: {
    padding: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  joinPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  joinTitle: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: '#000000'
  },
  joinInfo: {
    fontWeight: '500',
    marginTop: theme.spacing(2),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F'
  },
  joinStep: {
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#000000',
    width: '100%'
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      border: '1px solid red',
      width: 244
    }
  },
  helperText: {
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: theme.spacing(2)
  },
  step: {
    marginTop: theme.spacing(4),
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      border: '1px solid green',
      alignItems: 'flex-start'
    }
  },
  storeBtn: {
    margin: theme.spacing(1, 0),
    width: 200
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
    margin: theme.spacing(6, 0, 1, 0)
  },
  marginMd: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(11)
    }
  }
})
