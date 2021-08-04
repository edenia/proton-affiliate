import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import Popover from '@material-ui/core/Popover'

import { useSharedState } from '../../context/state.context'
import TableSearch from '../../components/TableSearch'

import styles from './styles'

const headCellAffiliate = [
  { id: 'username', align: 'left', label: 'username' },
  { id: 'status', align: 'center', label: 'status' },
  { id: 'reward', align: 'center', label: 'reward' },
  { id: 'tx', align: 'right', label: 'tx' }
]
const useStyles = makeStyles(styles)

const Afiliate = () => {
  const classes = useStyles()
  const { t } = useTranslation('affiliateRoute')
  const [state] = useSharedState()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    navigator.clipboard.writeText(
      `https://earnproton.com/join/${
        state.user ? state.user.accountName : null
      }`
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
          url: `https://earnproton.com/join/${
            state.user ? state.user.accountName : null
          }`
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

        <Typography className={classes.affiliateTitleDesktop}>
          {t('titleDesktop')}
        </Typography>

        <Typography className={classes.affiliateInfo}>
          {t('pageInfo')}
        </Typography>
        <Typography className={classes.affiliateShare}>{t('copy')}</Typography>
        <Typography className={classes.affiliateShareDesktop}>
          {t('copyDesktop')}
        </Typography>

        <Button onClick={handleClick} className={classes.affiliateLinkInfo}>
          {`https://earnproton.com/join/${
            state.user ? state.user.accountName : null
          }`}
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
          // variant="contained"
          startIcon={<ShareIcon />}
          onClick={shareContent}
          className={classes.shareButon}
        >
          {t('butonLabel')}
        </Button>
      </Box>
      <Box className={classes.lastReferral}>
        <Typography variant="h5" className={classes.tableTitle}>
          {t('tableTitle')}
        </Typography>
      </Box>
      <TableSearch headCells={headCellAffiliate || []} rows={[]} />
    </Box>
  )
}

export default Afiliate
