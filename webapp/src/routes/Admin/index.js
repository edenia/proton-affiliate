import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import { useLazyQuery } from '@apollo/client'
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
import FloatingMenu from '../../components/FloatingButton'
import {
  affiliateUtil,
  getUALError,
  useImperativeQuery,
  getLastCharacters
} from '../../utils'
import { useSharedState } from '../../context/state.context'
import { GET_HISTORY, GET_JOIN_REQUEST } from '../../gql'

import AddUserModal from './AddUserModal'
import styles from './styles'

const headCellNewUsers = [
  { id: 'account', align: 'left', useMainColor: true, label: 'account' },
  { id: 'applied', align: 'center', useMainColor: false, label: 'applied' },
  { id: 'email', align: 'right', useMainColor: true, label: 'email' }
]
const headCellUserApprovals = [
  { id: 'username', align: 'left', useMainColor: true, label: 'username' },
  { id: 'role', align: 'center', useMainColor: false, label: 'role' },
  { id: 'reward', align: 'center', useMainColor: false, label: 'reward' },
  { id: 'tx', align: 'right', useMainColor: true, label: 'tx' }
]
const headCellReferralPayment = [
  { id: 'invitee', align: 'left', useMainColor: true, label: 'invitee' },
  { id: 'status', align: 'center', useMainColor: false, label: 'status' },
  { id: 'referrer', align: 'center', useMainColor: false, label: 'referrer' },
  { id: 'tx', align: 'right', useMainColor: true, label: 'last tx' }
]

const initNewUsersPagination = {
  count: 0,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25],
  page: 0
}

const useStyles = makeStyles(styles)

const dateFormat = time => {
  const currentData = moment()
  const diff = currentData.diff(moment(time), 'days')

  if (diff === 0) return 'Today'

  return moment(time).format('ll')
}

const OptionFAB = ({ type, onClickApprove }) => {
  const classes = useStyles()
  const { t } = useTranslation('adminRoute')
  let result = <></>

  switch (type) {
    case 'new': {
      result = (
        <>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('approveUser')}
            </Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="edit"
              onClick={onClickApprove}
            >
              <CheckIcon />
            </Fab>
          </Box>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('rejectUser')}
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
        </>
      )
      break
    }

    case 'management': {
      result = (
        <Box className={classes.wrapperAction}>
          <Typography className={classes.actionLabel}>
            {t('removeAffiliate')}
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
      )
      break
    }

    default:
      break
  }

  return result
}

OptionFAB.propTypes = {
  type: PropTypes.string,
  onClickApprove: PropTypes.func
}

OptionFAB.defaultProps = {
  onClickApprove: () => {}
}

const Admin = () => {
  const classes = useStyles()
  const { t } = useTranslation('adminRoute')
  const [openFAB, setOpenFAB] = useState(false)
  const loadHistoryQuery = useImperativeQuery(GET_HISTORY)
  const [
    loadNewUsers,
    { loading = true, data: { joinRequest, infoJoin } = {} }
  ] = useLazyQuery(GET_JOIN_REQUEST)
  const [open, setOpen] = useState(false)
  const [openAddUser, setAddUser] = useState(false)
  const [openInfoModa, setOpenInfoModal] = useState(false)
  const [newUsersRows, setNewUserRows] = useState([])
  const [newUsersPagination, setNewUsersPagination] = useState(
    initNewUsersPagination
  )
  const [userRows, setUserRows] = useState([])
  const [userPagination, setUserPagination] = useState({})
  const [referralRows, setReferralRows] = useState([])
  const [referralPagination, setReferralPagination] = useState({})
  const [currentReferral, setCurrentReferral] = useState()
  const [selected, setSelected] = useState({ tableName: null })
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

  const handleOnSelectItem = (tableName, items) => {
    if (!items.length) {
      setSelected({ tableName: null })

      return
    }

    setSelected({ [tableName]: items, tableName })
  }

  const handleOnPageChange = (_, page) => {
    setNewUsersPagination(prev => ({
      ...prev,
      page
    }))

    joinRequest({
      variables: {
        offset: page * newUsersPagination.rowsPerPage,
        limit: newUsersPagination.rowsPerPage
      }
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

  const getAccountName = () => {
    if (!(selected.new || []).length) return ''

    const accountsNames = (newUsersRows || [])
      .filter(item =>
        (selected.new || []).find(selectItem => selectItem === item.id)
      )
      .map(user => user.account)

    return accountsNames.toString()
  }

  useEffect(() => {
    if (loading || !joinRequest) return

    const data = (joinRequest || []).map(item => ({
      ...item,
      account: item.account,
      applied: dateFormat(item.created_at),
      email: item.email
    }))

    setNewUsersPagination({
      ...newUsersPagination,
      count: infoJoin.aggregate.count
    })
    setNewUserRows(data)
  }, [loading, joinRequest, infoJoin])

  useEffect(() => {
    handleOnLoadMore()
    handleOnLoadMoreReferrals()
    loadNewUsers({
      variables: {
        offset: 0,
        limit: 5
      }
    })
  }, [])

  return (
    <Box className={classes.adminPage}>
      <Box className={classes.adminHead}>
        <Typography className={classes.adminTitle}>{t('title')}</Typography>
        <Typography className={classes.adminInfo}>{t('pageInfo')}</Typography>
      </Box>
      <Accordion title="New Affiliates">
        <TableSearch
          tableName="new"
          onSelectItem={handleOnSelectItem}
          selected={selected.new || []}
          rows={newUsersRows}
          showColumnCheck
          headCells={headCellNewUsers}
          idName="id"
          pagination={newUsersPagination}
          handleOnPageChange={handleOnPageChange}
          handleOnRowsPerPageChange={() => {}}
          usePagination
        />
      </Accordion>
      <Accordion title="User Management">
        <TableSearch
          tableName="management"
          onSelectItem={handleOnSelectItem}
          selected={selected.management || []}
          useLoadMore
          rows={userRows}
          showColumnCheck
          headCells={headCellUserApprovals}
          handleOnLoadMore={handleOnLoadMore}
          idName="username"
        />
      </Accordion>
      <Accordion title="Referral Payments">
        <TableSearch
          tableName="payment"
          onSelectItem={handleOnSelectItem}
          selected={selected.payment || []}
          useLoadMore
          rows={referralRows}
          showColumnCheck={false}
          headCells={headCellReferralPayment}
          handleOnLoadMore={console.log}
          onClickRow={handleOnClickReferral}
          idName="invitee"
        />
      </Accordion>
      <FloatingMenu open={openFAB} setOpen={setOpenFAB} label="ACTIONS">
        <Box className={classes.fabBox}>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('addAccount')}
            </Typography>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={() => {
                setAddUser(true)
                setOpenFAB(false)
              }}
            >
              <AddIcon />
            </Fab>
          </Box>
          <OptionFAB
            type={selected.tableName}
            onClickApprove={() => {
              setOpenInfoModal(true)
              setOpenFAB(false)
            }}
          />
        </Box>
      </FloatingMenu>
      <AddUserModal
        onClose={() => setAddUser(false)}
        t={t}
        open={openAddUser}
      />
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
          <Box className={classes.bodySecondary}>
            <Box>
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
            </Box>

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
        </Box>
      </Modal>
      <Modal open={openInfoModa} setOpen={setOpenInfoModal}>
        <Box className={classes.rejectModal}>
          <Typography className={classes.text}>
            {`${t('rejectUserMessage')} ${getAccountName()}`}
          </Typography>
          <Box item xs={12} className={classes.btnAddAccount}>
            <Button onClick={() => setOpenInfoModal(false)}>
              {t('cancel')}
            </Button>
            <Button color="primary" onClick={() => {}}>
              {t('add')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default Admin
