export default theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  accordion: {
    border: 'none',
    boxShadow: 'none'
  },
  accordionDetails: {
    padding: 0
  },
  color: {
    backgroundColor: 'rgba(245, 247, 250, 0.74)',
    border: 'none',
    boxShadow: 'none',
    height: '64px !important'
  },
  heading: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 21,
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: theme.palette.warning.contrastText
  },
  summary: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkIcon: {
    color: theme.palette.primary.main,
    margin: theme.spacing(0, 2)
  },
  menuLabel: {
    alignSelf: 'flex-start',
    flexGrow: 0,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 2.29,
    letterSpacing: 0.04,
    textAlign: 'left'
  }
})
