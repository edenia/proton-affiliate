export default theme => ({
  secondayBar: {
    width: '100%',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.error.contrastText,
    [theme.breakpoints.up('md')]: {
      width: 514,
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
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      width: 430
    }
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    '& svg': {
      fontSize: '48px',
      color: '#1FACFF'
    },
    '& p': {
      width: '220px',
      margin: '8px 0 0',
      fontWeight: 500,
      textTransform: 'uppercase',
      textAlign: 'center',
      color: '#000'
    }
  },
  boxSecondary: {
    height: '100%'
  },
  listActions: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column'
  }
})
