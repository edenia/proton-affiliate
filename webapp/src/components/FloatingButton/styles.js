export default theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
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
      bottom: theme.spacing(10)
    }
  }
})
