import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import TableSearch from '../../components/TableSearch'
import CustomizedTimeline from '../../components/Timeline'
import Modal from '../../components/Modal'
import Accordion from '../../components/Accordion'
import FloatingMenu from '../../components/FloatingButon'
import {
  affiliateUtil,
  getUALError,
  useImperativeQuery,
  getLastCharacters
} from '../../utils'
import { useSharedState } from '../../context/state.context'
import { GET_HISTORY } from '../../gql'

import styles from './styles'

const headCellUserApprovals = [
  { id: 'username', align: 'left', label: 'username' },
  { id: 'role', align: 'center', label: 'role' },
  { id: 'reward', align: 'center', label: 'reward' },
  { id: 'tx', align: 'center', label: 'tx' }
]
const headCellReferralPayment = [
  { id: 'invitee', align: 'left', label: 'invitee' },
  { id: 'status', align: 'center', label: 'status' },
  { id: 'referrer', align: 'center', label: 'referrer' },
  { id: 'tx', align: 'center', label: 'last tx' }
]

const useStyles = makeStyles(styles)

const Admin = () => {
  const classes = useStyles()
  const { t } = useTranslation('adminRoute')
  const loadHistoryQuery = useImperativeQuery(GET_HISTORY)
  const [open, setOpen] = useState(false)
  const [userRows, setUserRows] = useState([])
  const [userPagination, setUserPagination] = useState({})
  const [referralRows, setReferralRows] = useState([])
  const [referralPagination, setReferralPagination] = useState({})
  const [currentReferral, setCurrentReferral] = useState()
  const [{ ual }, { showMessage }] = useSharedState()

  const handleOnLoadMore = async () => {
    const users = await affiliateUtil.getUsers(userPagination.cursor)
    const data = (users.rows || []).map(item => ({
      username: item.user,
      role: item.role,
      reward: '-',
      tx: '-'
    }))

    setUserRows([...userRows, ...data])
    setUserPagination({
      hasMore: users.hasMore,
      cursor: users.cursor
    })
  }

  const handleOnLoadMoreReferrals = async () => {
    const referrals = await affiliateUtil.getReferrals(
      referralPagination.cursor
    )
    const invitees = (referrals.rows || []).map(item => item.invitee)
    const { data } = await loadHistoryQuery({ invitees })
    const newRows = (referrals.rows || []).map(row => {
      const history = data.history.filter(item => item.invitee === row.invitee)

      return {
        ...row,
        history,
        tx: getLastCharacters((history[history.length - 1] || {}).trxid)
      }
    })

    setReferralRows(
      referralPagination.cursor ? [...referralRows, ...newRows] : newRows
    )
    setReferralPagination({
      hasMore: referrals.hasMore,
      cursor: referrals.cursor
    })
  }

  const reloadReferrals = () => {
    setReferralPagination({
      hasMore: false,
      cursor: ''
    })
    setTimeout(handleOnLoadMoreReferrals, 500)
  }

  const handleOnClickReferral = data => {
    setOpen(true)
    setCurrentReferral(data)
  }

  const handleOnPayRef = async () => {
    try {
      const data = await affiliateUtil.payRef(
        ual.activeUser,
        currentReferral?.invitee
      )
      console.log('handleOnPayRef', data)
      showMessage({ type: 'success', content: t('success') })
      handleOnClose()
      reloadReferrals()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnRejectRef = async () => {
    try {
      const data = await affiliateUtil.rejectRef(
        ual.activeUser,
        currentReferral?.invitee
      )
      console.log('handleOnRejectRef', data)
      handleOnClose()
      showMessage({ type: 'success', content: t('success') })
      reloadReferrals()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnApproveKyc = async () => {
    try {
      const data = await affiliateUtil.approveKyc(
        ual.activeUser,
        currentReferral?.invitee
      )
      console.log('handleOnRejectRef', data)
      handleOnClose()
      showMessage({ type: 'success', content: t('success') })
      reloadReferrals()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnClose = () => {
    setOpen(false)
    setCurrentReferral(null)
  }

  useEffect(() => {
    handleOnLoadMore()
    handleOnLoadMoreReferrals()
  }, [])

  return (
    <Box className={classes.adminPage}>
      <Box className={classes.adminHead}>
        <Typography className={classes.adminTitle}>{t('title')}</Typography>
        <Typography className={classes.adminInfo}>{t('pageInfo')}</Typography>
      </Box>
      <Accordion title="User Approvals">
        <TableSearch
          useLoadMore
          rows={userRows}
          showColumnCheck
          headCells={headCellUserApprovals}
          handleOnLoadMore={handleOnLoadMore}
        />
      </Accordion>
      <Accordion title="Referral Payments">
        <TableSearch
          useLoadMore
          rows={referralRows}
          showColumnCheck={false}
          headCells={headCellReferralPayment}
          handleOnLoadMore={console.log}
          onClickRow={handleOnClickReferral}
        />
      </Accordion>
      <FloatingMenu>
        <Box className={classes.fabBox}>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('addAccount')}
            </Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => {}}
            >
              <AddIcon />
            </Fab>
          </Box>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('approveAccount')}
            </Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="edit"
              onClick={() => {}}
            >
              <CheckIcon />
            </Fab>
          </Box>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('rejectAccount')}
            </Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="reject"
              onClick={() => {}}
            >
              <CloseIcon />
            </Fab>
          </Box>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('removeListing')}
            </Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="delete"
              onClick={() => {}}
            >
              <DeleteIcon />
            </Fab>
          </Box>
        </Box>
      </FloatingMenu>
      <Modal open={open} setOpen={handleOnClose}>
        <Box className={classes.timeline}>
          <Box className={classes.secondayBar} position="sticky">
            <IconButton aria-label="Back" onClick={() => setOpen(false)}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography className={classes.secondayTitle}>
              {currentReferral?.invitee} by {currentReferral?.referrer}
            </Typography>
          </Box>
          <Typography className={classes.timelineTitle}>
            {t('timelimeTitle')}
          </Typography>
          <CustomizedTimeline items={currentReferral?.history} />
          {currentReferral?.status ===
            affiliateUtil.REFFERAL_STATUS[
              affiliateUtil.REFFERAL_STATUS_IDS.PENDING_PAYMENT
            ] && (
            <Box className={classes.modalFooter}>
              <Typography>Approve This Refferal Payment</Typography>
              <Box className={classes.modalBtnWrapper}>
                <Button
                  variant="contained"
                  onClick={handleOnRejectRef}
                  className={clsx(classes.timelineBtn, classes.reject)}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnPayRef}
                  className={classes.timelineBtn}
                >
                  Yes
                </Button>
              </Box>
            </Box>
          )}
          {currentReferral?.status ===
            affiliateUtil.REFFERAL_STATUS[
              affiliateUtil.REFFERAL_STATUS_IDS.PENDING_KYC_VERIFICATION
            ] && (
            <Box className={classes.modalFooter}>
              <Typography>Approve This Refferal KYC</Typography>
              <Box className={classes.modalBtnWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnApproveKyc}
                  className={classes.timelineBtn}
                >
                  Yes
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  )
}

export default Admin
