export default theme => ({
  homePage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 1024
    }
  },
  title: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
      margin: 0
    }
  },
  onChain: {
    fontWeight: 'bold',
    fontSize: 38,
    lineHeight: '52px',
    textAlign: 'center',
    color: '#7045D9'
  },
  referralText: {
    fontWeight: 'bold',
    fontSize: 38,
    lineHeight: '52px',
    textAlign: 'center',
    color: theme.palette.common.black
  },
  info: {
    fontSize: 18,
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.25px',
    color: '#6B717F',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: 330,
      fontSize: 21,
      textAlign: 'left',
      letterSpacing: '0.6px',
      lineHeight: '28px'
    }
  },
  joinBtn: {
    width: 270,
    height: 48,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: theme.palette.common.white,
    borderRadius: 0
  },
  lastReferral: {
    marginTop: theme.spacing(6),
    width: '100%',
    background: 'rgba(245, 247, 250, 0.74)',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(8)
    }
  },
  tableTitle: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  table: {
    '& th': {
      padding: theme.spacing(2, 1),
      fontWeight: '600',
      fontSize: 12,
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    '& td': {
      padding: theme.spacing(2, 1),
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13
    }
  },
  mainColorRow: {
    color: theme.palette.primary.main
  },
  joinModel: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 2, 3),
    borderRadius: 5,
    [theme.breakpoints.up('md')]: {
      width: 300
    }
  },
  joinText: {
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  helperText: {
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: theme.spacing(1)
  },
  checkBoxReceive: {
    marginTop: theme.spacing(1),
    '& .MuiFormControlLabel-label': {
      fontSize: 15,
      lineHeight: '24px',
      letterSpacing: '0.15px',
      color: theme.palette.common.black
    }
  },
  bntWrapper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between'
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .left': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 350
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      width: '100%',
      flexDirection: 'row'
    }
  },
  imageSm: {
    display: 'initial',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  imageMd: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'initial'
    }
  },
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
