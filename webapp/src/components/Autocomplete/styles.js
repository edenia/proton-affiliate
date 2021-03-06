export default theme => ({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  },
  autocompleteField: {
    width: '100%',
    marginTop: 16,
    [theme.breakpoints.up('md')]: {
      width: 244
    }
  }
})
