export default theme => ({
  affiliatePage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  affiliateTitle: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: '#000000'
  },
  affiliateInfo: {
    fontWeight: '500',
    margin: theme.spacing(2, 0),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F'
  },
  affiliateShare: {
    fontWeight: '500',
    width: '100%',
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    color: '#000000'
  },
  affiliateLinkInfo: {
    fontWeight: '600',
    margin: theme.spacing(2, 0),
    width: 200,
    fontSize: 12,
    lineHeight: '16px',
    textAlign: 'center',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: '#000000',
    overflowWrap: ' break-word'
  },
  lastReferral: {
    marginTop: theme.spacing(4),
    height: 56,
    width: '100%',
    background: 'rgba(245, 247, 250, 0.74)',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3)
  },
  tableTitle: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  affiliateHead: {
    padding: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  popover: {
    '& .MuiPopover-paper': {
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      width: 250,
      padding: theme.spacing(1)
    }
  },
  popoverTypography: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: '20px',
    color: '#FFFFFF',
    textAlign: 'center'
  }
})
