import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import Popover from '@material-ui/core/Popover'

import TableComp from '../../components/Table'

const useStyles = makeStyles(theme => ({
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
}))

const Afiliate = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    navigator.clipboard.writeText('https://eoscostarica.io/')
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const shareContent = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'share demo',
          url: 'https://eoscostarica.io/'
        })
        .then(() => {
          console.log('Thanks for sharing!')
        })
        .catch(console.error)
    } else {
      console.log('Should be show some dialog for desktop version')
    }
  }

  return (
    <Box className={classes.affiliatePage}>
      <Box className={classes.affiliateHead}>
        <Typography className={classes.affiliateTitle}>Welcome to</Typography>
        <Typography className={classes.affiliateTitle}>
          Proton’s Affiliate Program
        </Typography>
        <Typography className={classes.affiliateInfo}>
          Receive XPR token rewards equal to US$10.00 for every person you
          invite that registers to Proton as a user and completes the KYC within
          72 hours.
        </Typography>
        <Typography className={classes.affiliateShare}>
          Copy and share this URL to invite new users:
        </Typography>

        <Button onClick={handleClick}>
          <Typography className={classes.affiliateLinkInfo}>
            https://earnproton.com/bobwhite
          </Typography>
        </Button>
        <Popover
          id="copy-popover"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.popover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Typography className={classes.popoverTypography}>
            Affiliate URL has been copied to your clipboard.
          </Typography>
        </Popover>
        <Button
          color="primary"
          startIcon={<ShareIcon />}
          onClick={shareContent}
        >
          Share on Social Media
        </Button>
      </Box>
      <Box className={classes.lastReferral}>
        <Typography variant="h5" className={classes.tableTitle}>
          Your Invitees
        </Typography>
      </Box>
      <TableComp />
    </Box>
  )
}

export default Afiliate
