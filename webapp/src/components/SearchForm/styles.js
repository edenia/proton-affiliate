export default theme => ({
  searchFormWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
    borderRadius: 30,
    backgroundColor: '#010c2c',
    margin: theme.spacing(8, 2, 0, 2),
    [theme.breakpoints.up('md')]: {
      margin: 0,
      width: '100%'
    }
  },
  searchTitle: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      textAlign: 'center'
    }
  },
  searchBtn: {
    marginTop: theme.spacing(2),
    width: '100%',
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 0,
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      width: 201,
      marginLeft: theme.spacing(3)
    }
  },
  searchInput: {
    width: '100%',
    '& label.Mui-focused': {
      color: theme.palette.common.white
    },
    '& input': {
      color: theme.palette.common.white
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'transparent'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      '& fieldset': {
        borderColor: theme.palette.common.white
      },
      '&:hover fieldset': {
        borderColor: theme.palette.common.white
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.common.white
      }
    },
    [theme.breakpoints.up('md')]: {
      width: 376
    }
  },
  formInputsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      margin: 0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  },
  form: {
    width: '100%'
  }
})
