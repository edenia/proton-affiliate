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
  }
})
