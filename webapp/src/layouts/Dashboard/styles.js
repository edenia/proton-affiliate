export default (theme, drawerWidth) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    overflow: 'hidden',
    height: '100vh'
  },
  childContent: {
    flex: 1,
    height: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    overflow: 'scroll'
  }
})
