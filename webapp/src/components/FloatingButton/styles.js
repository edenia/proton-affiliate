export default theme => ({
  floatBtnBox: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 0,
    '& > *': {
      margin: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      width: 1024
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(18),
    right: theme.spacing(2),
    zIndex: 100,
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(8),
      right: 0
    }
  }
})
