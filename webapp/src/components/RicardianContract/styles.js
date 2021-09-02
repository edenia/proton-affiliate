export default theme => ({
  ricardianContractContainer: {
    width: '100%',
    '& h3': {
      fontSize: 38
    },
    '& h1': {
      fontSize: 32,
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
    '& img': {
      width: 24
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
    fontSize: 24,
    color: '#484158'
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  boxTitleClauses: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    '& img': {
      width: 24
    }
  },
  dividerClauses: {
    margin: theme.spacing(1, 0, 2, 0)
  },
  listItem: {
    margin: theme.spacing(1, 0, 1, 1)
  }
})
