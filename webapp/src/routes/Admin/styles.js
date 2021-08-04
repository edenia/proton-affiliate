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
    color: '#000000'
  },
  adminInfo: {
    fontWeight: '500',
    margin: theme.spacing(2, 0),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F'
  },
  adminPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  adminHead: {
    padding: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
    color: '#fff',
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
    padding: theme.spacing(0, 4)
  },
  secondayTitle: {
    fontSize: 21,
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.15px',
    textAlign: 'center',
    color: '#000000'
  },
  timeline: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  }
})
