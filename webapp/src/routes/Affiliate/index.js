import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLazyQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import Popover from '@material-ui/core/Popover'

import { useSharedState } from '../../context/state.context'
import { GET_MY_REFERRALS } from '../../gql'
import { affiliateUtil, getLastCharacters } from '../../utils'
import TableSearch from '../../components/TableSearch'

import styles from './styles'

const headCellAffiliate = [
  { id: 'invitee', align: 'left', label: 'invitee' },
  { id: 'status', align: 'center', label: 'status' },
  { id: 'reward', align: 'center', label: 'reward' },
  { id: 'tx', align: 'right', label: 'tx' }
]
const initReferralPagination = {
  count: 0,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25],
  page: 0
}
const useStyles = makeStyles(styles)

const Afiliate = () => {
  const classes = useStyles()
  const { t } = useTranslation('affiliateRoute')
  const [state] = useSharedState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [loadReferrals, { loading = true, data: { referrals, info } = {} }] =
    useLazyQuery(GET_MY_REFERRALS)
  const [referralPagination, setReferralPagination] = useState(
    initReferralPagination
  )
  const [referralRows, setReferralRows] = useState([])

  const handleOnPageChange = (_, page) => {
    setReferralPagination(prev => ({
      ...prev,
      page
    }))

    loadReferrals({
      variables: {
        where: { referrer: { _eq: state.user.accountName } },
        offset: page * referralPagination.rowsPerPage,
        limit: referralPagination.rowsPerPage
      }
    })
  }

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

  useEffect(() => {
    if (loading || !referrals) return

    const data = (referrals || []).map(item => {
      const history = item.history || []

      return {
        invitee: item.invitee,
        status: affiliateUtil.REFFERAL_STATUS[item.status],
        referrer: item.referrer,
        tx: getLastCharacters((history[history.length - 1] || {}).trxid)
      }
    })

    setReferralPagination({
      ...referralPagination,
      count: info.referrals.count
    })
    setReferralRows(data)
  }, [loading, referrals, info])

  useEffect(() => {
    if (!state.user) return

    loadReferrals({
      variables: {
        where: { referrer: { _eq: state.user.accountName } },
        offset: 0,
        limit: 5
      }
    })
  }, [])

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
      <TableSearch
        headCells={headCellAffiliate || []}
        rows={referralRows || []}
        pagination={referralPagination}
        handleOnPageChange={handleOnPageChange}
        handleOnRowsPerPageChange={() => {}}
        usePagination={Boolean(referralRows.length)}
      />
    </Box>
  )
}

export default Afiliate
