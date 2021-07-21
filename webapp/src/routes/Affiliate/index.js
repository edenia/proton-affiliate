import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import Popover from '@material-ui/core/Popover'

import { useSharedState } from '../../context/state.context'
import TableComp from '../../components/Table'

import styles from './styles'

const useStyles = makeStyles(styles)

const Afiliate = () => {
  const classes = useStyles()
  const { t } = useTranslation('affiliateRoute')
  const [state] = useSharedState()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    navigator.clipboard.writeText(
      `https://earnproton.com/join/${state.user.accountName}`
    )
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
          url: `https://earnproton.com/join/${state.user.accountName}`
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
        <Typography className={classes.affiliateTitle}>
          {t('title1')}
        </Typography>
        <Typography className={classes.affiliateTitle}>
          {t('title2')}
        </Typography>
        <Typography className={classes.affiliateInfo}>
          {t('pageInfo')}
        </Typography>
        <Typography className={classes.affiliateShare}>{t('copy')}</Typography>

        <Button onClick={handleClick}>
          <Typography className={classes.affiliateLinkInfo}>
            {`https://earnproton.com/join/${state.user.accountName}`}
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
            {t('copiedMessage')}
          </Typography>
        </Popover>
        <Button
          color="primary"
          startIcon={<ShareIcon />}
          onClick={shareContent}
        >
          {t('butonLabel')}
        </Button>
      </Box>
      <Box className={classes.lastReferral}>
        <Typography variant="h5" className={classes.tableTitle}>
          {t('tableTitle')}
        </Typography>
      </Box>
      <TableComp />
    </Box>
  )
}

export default Afiliate
