export default theme => ({
  footer: {
    padding: theme.spacing(3, 0, 1, 0),
    height: 177,
    position: 'relative',
    backgroundColor: '#F8F9FB',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: 97,
      padding: 0
    }
  },
  listItem: {
    display: 'inline-block',
    width: 'auto',
    padding: 0,
    '& .MuiListItemIcon-root': {
      display: 'flex',
      justifyContent: 'center'
    },
    '& svg': {
      color: theme.palette.text.disabled
    }
  },
  supportBy: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: '16px',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: theme.palette.text.disabled,
    width: 200,
    [theme.breakpoints.up('md')]: {
      width: '100%',
      textAlign: 'start'
    }
  },
  footerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: 1024,
      height: 97,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  },
  madeBy: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: '16px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.text.disabled,
    letterSpacing: '0.4px'
  },
  list: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up('md')]: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: theme.spacing(1, 0, 0, 0)
    }
  },
  supportWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100%',
      justifyContent: 'center'
    }
  },
  madeBySm: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  madeByMd: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginBottom: theme.spacing(1)
    }
  },
  links: {
    color: theme.palette.text.disabled
  }
})
