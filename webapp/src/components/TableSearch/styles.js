export default theme => ({
  root: {
    width: '100%'
  },
  boxTable: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('md')]: {
      padding: 0
    }
  },
  table: {
    minWidth: '100%',
    '& .Mui-selected': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      }
    },
    '& th': {
      padding: theme.spacing(2, 0, 2, 1),
      fontWeight: '600',
      fontSize: 12,
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    '& td': {
      padding: theme.spacing(2, 0, 2, 1),
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13
    },

    [theme.breakpoints.up('md')]: {
      '& th': {
        padding: theme.spacing(2)
      },
      '& td': {
        padding: theme.spacing(2)
      }
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  mainColorRow: {
    color: theme.palette.primary.main
  },
  linkLabel: {
    fontSize: 13,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal'
  },
  tablePagination: {
    display: 'flex'
  },
  loadMore: {
    textTransform: 'uppercase',
    margin: theme.spacing(0, 1)
  },
  historyIcon: {
    fontSize: '1rem'
  },
  noPadding: {
    padding: '0 !important'
  },
  arrowBodyColumn: {
    [theme.breakpoints.up('md')]: {
      paddingRight: `${theme.spacing(2)}px !important`
    }
  }
})
