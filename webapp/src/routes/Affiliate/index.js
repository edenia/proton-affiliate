import React, { useState, useEffect, useRef } from 'react'
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
import { affiliateUtil, formatWithThousandSeparator } from '../../utils'
import TableSearch from '../../components/TableSearch'
import HistoryModal from '../../components/HistoryModal'

import styles from './styles'

const headCellAffiliate = [
  { id: 'invitee', align: 'left', label: 'account' },
  { id: 'status', align: 'center', label: 'status' },
  { id: 'reward', align: 'center', label: 'reward (XPR)' }
]
const initReferralPagination = {
  count: 0,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25],
  page: 0
}
const useStyles = makeStyles(styles)

const Affiliate = () => {
  const classes = useStyles()
  const { t } = useTranslation('affiliateRoute')
  const [state] = useSharedState()
  const [params, setParams] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [loadReferrals, { loading = true, data: { referrals, info } = {} }] =
    useLazyQuery(GET_MY_REFERRALS)
  const [referralPagination, setReferralPagination] = useState(
    initReferralPagination
  )
  const [referralRows, setReferralRows] = useState([])
  const [currentReferral, setCurrentReferral] = useState()
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const buttonEl = useRef(null)

  const handleOnRowPerPageChange = async e => {
    setReferralPagination(prev => ({
      ...prev,
      rowsPerPage: e.target.value
    }))

    await loadReferrals({
      variables: {
        where: { referrer: { _eq: state.user.accountName } },
        offset: referralPagination.page * e.target.value,
        limit: e.target.value
      }
    })
  }

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
      `${window.location.origin}/join/${
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
          title: 'share',
          url: `${window.location.origin}/join/${
            state.user ? state.user.accountName : null
          }`
        })
        .then(() => {
          console.log('Thanks for sharing!')
        })
        .catch(console.error)
    } else {
      buttonEl.current.click()
    }
  }

  const handleOnClickReferral = data => {
    setIsHistoryModalOpen(true)
    setCurrentReferral(data)
  }

  const loadParams = async () => {
    const params = await affiliateUtil.getParams()
    setParams(params)
  }

  useEffect(() => {
    if (loading || !referrals) return

    const data = (referrals || []).map(item => {
      const history = item.history || []

      return {
        history,
        invitee: item.invitee,
        status: t(affiliateUtil.REFERRAL_STATUS[item.status]),
        referrer: item.referrer,
        reward:
          history.find(item => item.action === 'payref')?.payload
            ?.referrerPayment?.amount || '-'
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

    loadParams()
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
        <Typography variant="h1" className={classes.affiliateTitle}>
          {t('title1')}
        </Typography>
        <Typography variant="h1" className={classes.affiliateTitle}>
          {t('title2')}
        </Typography>

        <Typography variant="h1" className={classes.affiliateTitleDesktop}>
          {t('titleDesktop')}
        </Typography>

        <Typography className={classes.affiliateInfo}>
          {t('pageInfo', {
            reward: formatWithThousandSeparator(params.usd_reward_amount, 2),
            hours: params.expiration_days
          })}
        </Typography>
        <Typography className={classes.affiliateShare}>{t('copy')}</Typography>
        <Typography className={classes.affiliateShareDesktop}>
          {t('copyDesktop')}
        </Typography>

        <Button
          ref={buttonEl}
          onClick={handleClick}
          className={classes.affiliateLinkInfo}
        >
          {`${window.location.origin}/join/${
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
        <Typography variant="h1" className={classes.tableTitle}>
          {t('tableTitle')}
        </Typography>
      </Box>
      <TableSearch
        showColumnButton
        onClickButton={handleOnClickReferral}
        headCells={headCellAffiliate || []}
        rows={referralRows || []}
        pagination={referralPagination}
        handleOnPageChange={handleOnPageChange}
        handleOnRowsPerPageChange={handleOnRowPerPageChange}
        usePagination={Boolean(referralRows.length)}
      />
      <HistoryModal
        referral={currentReferral}
        open={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </Box>
  )
}

export default Affiliate
