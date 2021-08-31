export default theme => ({
  ricardianContractContainer: {
    width: '100%',
    '& h3': {
      fontSize: 38
    },
    '& h1': {
      fontSize: 32,
      marginBottom: theme.spacing(2),
      fontWeight: 'bold'
    },
    [theme.breakpoints.up('sm')]: {
      '& h3': {
        fontSize: 50
      }
    }
  },
  link: {
    overflowWrap: 'anywhere'
  },
  boxTitle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    '& img': {
      width: 50
    }
  },
  boxText: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    '& h6': {
      fontWeight: '500',
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: '0.44px',
      color: '#6B717F'
    },
    '& h1': {
      fontSize: 21,
      fontWeight: '600',
      lineHeight: '27px',
      letterSpacing: '0.15px'
    }
  },
  defaultIcon: {
    fontSize: 65,
    color: '#484158'
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
})
