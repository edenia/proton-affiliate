export default theme => ({
  actionWrapper: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  adminTitle: {
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
      width: '100%'
    }
  },
  adminInfo: {
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
  adminPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 1024
    }
  },
  adminHead: {
    padding: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 0, 2, 0),
      width: '100%'
    }
  },
  fabBox: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(2)
  },
  wrapperAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2)
  },
  actionLabel: {
    flexGrow: 0,
    margin: '12px 16px 12px 0',
    fontSize: 14,
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1px',
    textAlign: 'right',
    color: theme.palette.error.contrastText,
    textTransform: 'uppercase'
  },
  secondayBar: {
    height: 80,
    backgroundColor: 'rgba(245, 247, 250, 0.74)',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(0, 1)
  },
  secondayTitle: {
    fontSize: 21,
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    textAlign: 'center',
    color: theme.palette.common.black
  },
  timeline: {
    width: '100%',
    height: '90%',
    backgroundColor: theme.palette.error.contrastText,
    [theme.breakpoints.up('md')]: {
      width: 375
    }
  },
  timelineBtn: {
    borderRadius: 20,
    width: 100
  },
  modalBtnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 4),
    width: '100%',
    marginTop: theme.spacing(3)
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  reject: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText
  }
})
