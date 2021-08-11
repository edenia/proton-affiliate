export default theme => ({
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
    height: '100%',
    backgroundColor: theme.palette.error.contrastText,
    [theme.breakpoints.up('md')]: {
      width: 375,
      height: '80%'
    }
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
  bodySecondary: {
    overflow: 'scroll',
    padding: theme.spacing(2, 1),
    height: 'calc(100% - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})
