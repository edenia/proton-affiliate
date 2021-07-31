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
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  summary: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
