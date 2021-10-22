export default theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'start',
    '& a': {
      color: theme.palette.primary.main
    }
  },
  secondaryTail: {
    backgroundColor: theme.palette.primary.main
  },
  main: {
    padding: 0,
    marginTop: theme.spacing(4)
  },
  infomation: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: '16px',
    display: 'flex',
    letterSpacing: '0.4px',
    color: '#000000',
    textAlign: 'start'
  },
  item: {
    marginTop: 0,
    marginBottom: 0
  },
  date: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: '16px',
    display: 'flex',
    alignItems: 'flex-end',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    color: theme.palette.common.black,
    marginTop: 5
  },
  paperWrapper: {
    paddingTop: 0,
    marginTop: -10
  },
  timeLineSeparator: {
    height: '100px'
  },
  secondaryColor: {
    borderColor: '#1DAEFF'
  },
  memoBox: {
    border: '3px solid #b00020',
    padding: 8,
    borderRadius: 4,
    color: '#b00020'
  }
})
