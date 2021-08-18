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
    backgroundColor: '#ffffff',
    height: '100vh'
  },
  childContent: {
    display: 'flex',
    height: '100%',
    overflow: 'scroll',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
