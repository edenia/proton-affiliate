export default theme => ({
  termsPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 1024
    }
  }
})
