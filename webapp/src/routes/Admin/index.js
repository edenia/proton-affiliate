import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import clsx from 'clsx'
import AddIcon from '@material-ui/icons/Add'
import { useLazyQuery, useMutation } from '@apollo/client'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import RestoreIcon from '@material-ui/icons/Restore'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

import { mainConfig } from '../../config'
import TableSearch from '../../components/TableSearch'
import Modal from '../../components/Modal'
import Accordion from '../../components/Accordion'
import FloatingMenu from '../../components/FloatingButton'
import HistoryModal from '../../components/HistoryModal'
import Loader from '../../components/Loader'
import {
  affiliateUtil,
  getUALError,
  useImperativeQuery,
  getLastCharacters,
  formatWithThousandSeparator
} from '../../utils'
import { useSharedState } from '../../context/state.context'
import {
  GET_HISTORY_BY_INVITEES,
  GET_HISTORY_BY_REFERRERS,
  GET_JOIN_REQUEST,
  GET_REJECTED_PAYMENTS,
  DELETE_JOIN_REQUEST_MUTATION,
  REJECT_JOIN_REQUEST_MUTATION,
  SEND_CONFIRMATION_MUTATION,
  UPDATE_JOIN_REQUEST_MUTATION
} from '../../gql'

import AddUserModal from './AddUserModal'
import RejectPaymentModal from './RejectPaymentModal'
import styles from './styles'

const headCellNewUsers = [
  {
    id: 'account',
    align: 'left',
    useMainColor: true,
    rowLink: true,
    label: 'account'
  },
  {
    id: 'status',
    align: 'center',
    useMainColor: false,
    rowLink: false,
    label: 'status'
  },
  {
    id: 'applied',
    align: 'center',
    useMainColor: false,
    rowLink: false,
    label: 'applied'
  },
  {
    id: 'email',
    align: 'right',
    useMainColor: false,
    rowLink: false,
    label: 'email'
  }
]
const headCellUserApprovals = [
  {
    id: 'username',
    align: 'left',
    useMainColor: true,
    rowLink: true,
    label: 'account'
  },
  {
    id: 'role',
    align: 'center',
    useMainColor: false,
    rowLink: false,
    label: 'role'
  },
  {
    id: 'reward',
    align: 'center',
    useMainColor: false,
    rowLink: false,
    label: 'totalRewards'
  },
  {
    id: 'tx',
    align: 'right',
    useMainColor: true,
    rowLink: false,
    label: 'lastTX'
  }
]
const headCellReferralPayment = [
  {
    id: 'invitee',
    align: 'left',
    useMainColor: true,
    rowLink: true,
    label: 'invitee'
  },
  {
    id: 'status',
    align: 'center',
    useMainColor: false,
    rowLink: false,
    label: 'status'
  },
  {
    id: 'referrer',
    align: 'center',
    useMainColor: false,
    rowLink: false,
    label: 'affiliate'
  }
]

const referralPaymentFilterValues = [
  {
    label: 'allStatus'
  },
  {
    label: 'PENDING_USER_REGISTRATION',
    value: affiliateUtil.REFERRAL_STATUS_IDS.PENDING_USER_REGISTRATION
  },
  {
    label: 'PENDING_KYC_VERIFICATION',
    value: affiliateUtil.REFERRAL_STATUS_IDS.PENDING_KYC_VERIFICATION
  },
  {
    label: 'PENDING_PAYMENT',
    value: affiliateUtil.REFERRAL_STATUS_IDS.PENDING_PAYMENT
  },
  {
    label: 'PAYMENT_REJECTED',
    value: affiliateUtil.REFERRAL_STATUS_IDS.PAYMENT_REJECTED
  },
  {
    label: 'EXPIRED',
    value: affiliateUtil.REFERRAL_STATUS_IDS.EXPIRED
  },
  {
    label: 'PAID',
    value: affiliateUtil.REFERRAL_STATUS_IDS.PAID
  }
]

const joinRequestFilterValues = [
  { label: 'allStatus' },
  {
    label: 'VERIFIED_KYC_VERIFICATION',
    value: affiliateUtil.JOIN_REQUEST_STATUS_IDS.PENDING_APPROVAL
  },
  {
    label: 'PENDING_KYC_VERIFICATION',
    value: affiliateUtil.JOIN_REQUEST_STATUS_IDS.PENDING_KYC
  }
]

const userManagementFilterValues = [
  { label: 'menuAllRoles' },
  {
    label: 'menuAdminRole',
    value: affiliateUtil.ROLES_IDS.ADMIN
  },
  {
    label: 'menuReferrerRole',
    value: affiliateUtil.ROLES_IDS.REFERRER
  }
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

const OptionFAB = ({
  type,
  onClickReject,
  onClickRemoveUsers,
  onClickApprovePayment,
  onClickRejectPayment,
  onClickReApprovePayment,
  onClickApproveNewUser,
  allowPayment,
  allowReApprove
}) => {
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
              aria-label="add"
              onClick={onClickApproveNewUser}
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
              onClick={onClickReject}
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
            onClick={onClickRemoveUsers}
          >
            <DeleteIcon />
          </Fab>
        </Box>
      )
      break
    }

    case 'payment': {
      result = (
        <>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('approvePayment')}
            </Typography>
            <Fab
              disabled={!allowPayment}
              size="small"
              color="primary"
              aria-label="approve"
              onClick={onClickApprovePayment}
            >
              <CheckIcon />
            </Fab>
          </Box>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('rejectPayment')}
            </Typography>
            <Fab
              disabled={!allowPayment}
              size="small"
              color="primary"
              aria-label="delete"
              onClick={onClickRejectPayment}
            >
              <CloseIcon />
            </Fab>
          </Box>
          <Box className={classes.wrapperAction}>
            <Typography className={classes.actionLabel}>
              {t('reApprovePayment')}
            </Typography>
            <Fab
              disabled={!allowReApprove}
              size="small"
              color="primary"
              aria-label="reapprove"
              onClick={onClickReApprovePayment}
            >
              <RestoreIcon />
            </Fab>
          </Box>
        </>
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
  onClickReject: PropTypes.func,
  onClickApprovePayment: PropTypes.func,
  onClickRejectPayment: PropTypes.func,
  onClickApproveNewUser: PropTypes.func,
  allowPayment: PropTypes.bool,
  allowReApprove: PropTypes.bool
}

OptionFAB.defaultProps = {
  onClickReject: () => {},
  onClickRemoveUsers: () => {},
  onClickApproveNewUser: () => {}
}

const Admin = () => {
  const classes = useStyles()
  const { t } = useTranslation('adminRoute')
  const [openFAB, setOpenFAB] = useState(false)
  const loadHistoryByInvites = useImperativeQuery(GET_HISTORY_BY_INVITEES)
  const loadHistoryByReferrers = useImperativeQuery(GET_HISTORY_BY_REFERRERS)
  const [
    loadNewUsers,
    { loading: loadingJoinRequest = true, data: { joinRequest, infoJoin } = {} }
  ] = useLazyQuery(GET_JOIN_REQUEST, { fetchPolicy: 'network-only' })
  const [
    loadRejectedPayments,
    {
      loading: loadingRejected = true,
      data: { referrals: rejectedPayments } = {}
    }
  ] = useLazyQuery(GET_REJECTED_PAYMENTS, { fetchPolicy: 'network-only' })
  const [deleteJoinRequest, { loading: loadingDelete }] = useMutation(
    DELETE_JOIN_REQUEST_MUTATION
  )
  const [rejectJoinRequest, { loading: loadingRejectJoinRequest }] =
    useMutation(REJECT_JOIN_REQUEST_MUTATION)
  const [sendConfirmation] = useMutation(SEND_CONFIRMATION_MUTATION)
  const [updateJoinRequest] = useMutation(UPDATE_JOIN_REQUEST_MUTATION)
  const [openAddUser, setAddUser] = useState(false)
  const [openRejectPayment, setRejectPayment] = useState({
    isOpen: false,
    previousModal: null
  })
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [allowPayment, setAllowPayment] = useState(false)
  const [allowReApprove, setAllowReApprove] = useState(false)
  const [newUsersRows, setNewUserRows] = useState([])
  const [newUsersPagination, setNewUsersPagination] = useState(
    initNewUsersPagination
  )
  const [fetchingData, setFetchingData] = useState(false)
  const [filterNewUsersBy, setFilterNewUsersBy] = useState()
  const [refPayFilterRowsBy, setRefPayFilterRowsBy] = useState()
  const [filterRowsBy, setFilterRowsBy] = useState()
  const [userRows, setUserRows] = useState([])
  const [userPagination, setUserPagination] = useState({})
  const [referralRows, setReferralRows] = useState([])
  const [currentReferral, setCurrentReferral] = useState()
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [referralPagination, setReferralPagination] = useState({})
  const [selected, setSelected] = useState({ tableName: 'payment' })
  const [usersAccounts, setUserAccounts] = useState([])
  const [{ user }, { showMessage }] = useSharedState()

  const handleOnLoadMoreUsers = async usePagination => {
    const pagination = usePagination ? userPagination : {}
    const users = await affiliateUtil.getUsersByRole(
      pagination.cursor,
      filterRowsBy
    )
    const referrers = (users.rows || []).map(item => item.user)
    const { data } = await loadHistoryByReferrers({ referrers })
    const newRows = (users.rows || []).map(row => {
      const history = data.history.filter(
        item => item.referral.referrer === row.user
      )
      const trxid = (history[history.length - 1] || {}).trxid

      return {
        role: t(row.role),
        username: row.user,
        reward: formatWithThousandSeparator(
          history.reduce(
            (total, item) => total + item.payload.referrerPayment?.amount,
            0
          ),
          2
        ),
        link: trxid,
        tx: getLastCharacters(trxid)
      }
    })

    setUserPagination({
      hasMore: users.hasMore,
      cursor: users.cursor
    })
    setUserRows(pagination.cursor ? [...userRows, ...newRows] : newRows)
    setFetchingData(false)
  }

  const deleteNewUsers = async (showSnack = true) => {
    try {
      await rejectJoinRequest({
        variables: {
          accounts: usersAccounts
        }
      })

      await loadJoinRequestUsers({
        offset: newUsersPagination.page * newUsersPagination.rowsPerPage,
        limit: newUsersPagination.rowsPerPage
      })

      showSnack &&
        showMessage({ type: 'success', content: t('deleteSuccessfully') })

      setOpenInfoModal(false)
      setSelected({ tableName: null })
      setUserAccounts([])
    } catch (error) {
      showMessage({ type: 'error', content: error })
    }
  }

  const approveNewUser = async () => {
    try {
      const data = await affiliateUtil.addUser(
        user.session,
        usersAccounts,
        affiliateUtil.ROLES_IDS.REFERRER,
        user.accountName
      )

      sendConfirmation({
        variables: {
          accounts: usersAccounts
        }
      })

      await updateJoinRequest({
        variables: {
          account: usersAccounts,
          status: affiliateUtil.JOIN_REQUEST_STATUS_IDS.APPROVED
        }
      })

      setAddUser(false)
      setSelected({ tableName: null })

      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${data.transactionId}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('successNewUser')} ${getLastCharacters(data.transactionId)}`}
          </a>
        )
      })

      reloadUsers()
      reloadJoinRequestUsers()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const reloadUsers = async () => {
    setFetchingData(true)
    setUserPagination({
      hasMore: false,
      cursor: ''
    })
    setTimeout(handleOnLoadMoreUsers, 1500)
  }

  const reloadJoinRequestUsers = async () => {
    setFetchingData(true)
    setNewUsersPagination(initNewUsersPagination)
    setTimeout(loadJoinRequestUsers, 1500)
  }

  const handleOnSelectItem = (tableName, items, accounts) => {
    if (!items.length) {
      setSelected({ tableName: null })

      return
    }

    setUserAccounts(accounts || [])
    setSelected({ [tableName]: items, tableName })
  }

  const handleOnPageChange = async (_, page) => {
    setNewUsersPagination(prev => ({
      ...prev,
      page
    }))

    await loadJoinRequestUsers({
      offset: page * newUsersPagination.rowsPerPage,
      limit: newUsersPagination.rowsPerPage
    })
  }

  const handleOnRowPerPageChange = async e => {
    setNewUsersPagination(prev => ({
      ...prev,
      rowsPerPage: e.target.value
    }))

    await loadJoinRequestUsers({
      offset: newUsersPagination.page * e.target.value,
      limit: e.target.value
    })
  }

  const handleOnLoadMoreReferrals = async usePagination => {
    const pagination = usePagination ? referralPagination : {}
    const referrals = await affiliateUtil.getReferralsByStatus(
      pagination.cursor,
      refPayFilterRowsBy
    )
    const invitees = (referrals.rows || []).map(item => item.invitee)
    const { data } = await loadHistoryByInvites({ invitees })
    let newRows = (referrals.rows || []).map(row => {
      const history = data.history.filter(item => item.invitee === row.invitee)

      return {
        ...row,
        history,
        status: t(row.status),
        statusId: row.status
      }
    })

    const filterRejected =
      refPayFilterRowsBy === affiliateUtil.REFERRAL_STATUS_IDS.PAYMENT_REJECTED

    if (!loadingRejected && (!refPayFilterRowsBy || filterRejected)) {
      const rejected = (rejectedPayments || [])
        .map(row => ({
          ...row,
          statusId: affiliateUtil.REFERRAL_STATUS[row.status],
          status: t(affiliateUtil.REFERRAL_STATUS[row.status])
        }))
        .filter(row => !newRows.some(newRow => newRow.invitee === row.invitee))

      newRows = newRows.concat(rejected || [])
    }

    setReferralPagination({
      hasMore: referrals.hasMore,
      cursor: referrals.cursor
    })
    setReferralRows(pagination.cursor ? [...referralRows, ...newRows] : newRows)
    setFetchingData(false)
  }

  const reloadReferrals = () => {
    setFetchingData(true)
    setReferralPagination({
      hasMore: false,
      cursor: ''
    })
    setTimeout(handleOnLoadMoreReferrals, 1500)
  }

  const handleOnClickReferral = data => {
    setIsHistoryModalOpen(true)
    setCurrentReferral(data)
  }

  const handleOnApprovePayment = async () => {
    try {
      const data = await affiliateUtil.payRef(
        user.session,
        currentReferral
          ? [currentReferral.invitee]
          : selected[selected.tableName],
        user.accountName
      )

      setSelected({ tableName: null })

      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${data.payload.tx}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(data.payload.tx)}`}
          </a>
        )
      })
      setIsHistoryModalOpen(false)
      reloadReferrals()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnRejectPayment = async (memo = '') => {
    try {
      const data = await affiliateUtil.rejectRef(
        user.session,
        currentReferral
          ? [currentReferral.invitee]
          : selected[selected.tableName],
        user.accountName,
        memo
      )

      setSelected({ tableName: null })

      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${data.transactionId}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(data.transactionId)}`}
          </a>
        )
      })
      setIsHistoryModalOpen(false)
      setRejectPayment({ isOpen: false, previousModal: null })
      reloadReferrals()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnReApprovePayment = async () => {
    try {
      const { invitees, referrers } = referralRows.reduce(
        (state, row) => {
          if (selected[selected.tableName].includes(row.invitee)) {
            state.invitees.push(row.invitee)
            state.referrers.push(row.referrer)
          }
          return state
        },
        { invitees: [], referrers: [] }
      )

      const data = await affiliateUtil.payRejected(
        user.session,
        invitees,
        referrers,
        user.accountName
      )

      setSelected({ tableName: null })

      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${data.payload.tx}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(data.payload.tx)}`}
          </a>
        )
      })
      setIsHistoryModalOpen(false)
      reloadReferrals()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnApproveKyc = async () => {
    try {
      const data = await affiliateUtil.approveKyc(
        user.session,
        currentReferral?.invitee,
        user.accountName
      )

      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${data.transactionId}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(data.transactionId)}`}
          </a>
        )
      })
      setIsHistoryModalOpen(false)
      reloadReferrals()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
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

  const handleOnSubmitAddUser = async payload => {
    try {
      const data = await affiliateUtil.addUser(
        user.session,
        [payload.account],
        payload.isAdmin
          ? affiliateUtil.ROLES_IDS.ADMIN
          : affiliateUtil.ROLES_IDS.REFERRER,
        user.accountName
      )

      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${data.transactionId}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(data.transactionId)}`}
          </a>
        )
      })
      setAddUser(false)
      reloadUsers()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnRemoveUsers = async () => {
    try {
      const data = await affiliateUtil.removeUsers(
        user.session,
        selected[selected.tableName],
        user.accountName
      )

      await deleteJoinRequest({
        variables: {
          where: { account: { _in: selected[selected.tableName] } }
        }
      })

      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${data.transactionId}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(data.transactionId)}`}
          </a>
        )
      })
      setOpenFAB(false)
      setSelected({ tableName: null })
      reloadUsers()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnCloseRejectPaymentModal = () => {
    switch (openRejectPayment.previousModal) {
      case 'optionFAB':
        setOpenFAB(true)
        break

      case 'history':
        setIsHistoryModalOpen(true)
        break

      default:
        break
    }

    setRejectPayment({ isOpen: false, previousModal: null })
  }

  const loadJoinRequestUsers = async ({
    offset = 0,
    limit = 5,
    where
  } = {}) => {
    const filterStatus = filterNewUsersBy
      ? [
          affiliateUtil.JOIN_REQUEST_STATUS_IDS[
            affiliateUtil.JOIN_REQUEST_STATUS[filterNewUsersBy]
          ]
        ]
      : [
          affiliateUtil.JOIN_REQUEST_STATUS_IDS.PENDING_KYC,
          affiliateUtil.JOIN_REQUEST_STATUS_IDS.PENDING_APPROVAL
        ]

    await loadNewUsers({
      variables: {
        offset,
        limit,
        where: where || {
          status: {
            _in: filterStatus
          }
        }
      }
    })

    setFetchingData(false)
  }

  const isAllowed = (selectedItems, status) => {
    return (
      !!selectedItems.length &&
      !referralRows
        .filter(row => selectedItems.includes(row.invitee))
        .find(row => row.statusId !== affiliateUtil.REFERRAL_STATUS[status])
    )
  }

  useEffect(() => {
    if (!fetchingData) return

    const loadRejected = async () => {
      await loadRejectedPayments({})
    }

    loadRejected()
  }, [loadRejectedPayments, fetchingData])

  useEffect(() => {
    if (loadingJoinRequest || !joinRequest) return

    const setUserData = async () => {
      const data = await Promise.all(
        (joinRequest || []).map(async item => {
          return {
            ...item,
            account: item.account,
            status:
              item.status ===
              affiliateUtil.JOIN_REQUEST_STATUS_IDS.PENDING_APPROVAL
                ? t('VERIFIED_KYC_VERIFICATION')
                : t('PENDING_KYC_VERIFICATION'),
            applied: dateFormat(item.created_at),
            email: item.email
          }
        })
      )

      setNewUsersPagination({
        ...newUsersPagination,
        count: infoJoin.aggregate.count
      })
      setNewUserRows(data)
    }

    setUserData()
  }, [loadingJoinRequest, joinRequest, infoJoin])

  useEffect(() => {
    if (selected.tableName !== 'payment') {
      return
    }

    const selectedItems = selected[selected.tableName] || []
    const allowedPayment = isAllowed(
      selectedItems,
      affiliateUtil.REFERRAL_STATUS_IDS.PENDING_PAYMENT
    )
    const allowedReApprove = isAllowed(
      selectedItems,
      affiliateUtil.REFERRAL_STATUS_IDS.PAYMENT_REJECTED
    )

    setAllowPayment(allowedPayment)
    setAllowReApprove(allowedReApprove)
  }, [selected, referralRows, setAllowPayment, setAllowReApprove])

  useEffect(() => {
    handleOnLoadMoreUsers()
    handleOnLoadMoreReferrals()
    loadJoinRequestUsers()
  }, [])

  useEffect(() => {
    reloadUsers()
  }, [filterRowsBy])

  useEffect(() => {
    reloadReferrals()
  }, [refPayFilterRowsBy, rejectedPayments])

  useEffect(() => {
    reloadJoinRequestUsers()
  }, [filterNewUsersBy])

  return (
    <Box className={classes.adminPage}>
      <Box className={classes.adminHead}>
        <Typography variant="h1" className={classes.adminTitle}>
          {t('title')}
        </Typography>
        <Typography className={classes.adminInfo}>{t('pageInfo')}</Typography>
      </Box>
      <Accordion
        title={t('referralPayments')}
        filterValues={referralPaymentFilterValues}
        filterRowsBy={refPayFilterRowsBy}
        handleOnFilter={filterValue => setRefPayFilterRowsBy(filterValue)}
      >
        <TableSearch
          tableName="payment"
          onSelectItem={handleOnSelectItem}
          selected={selected.payment || []}
          useLoadMore
          handleOnLoadMore={handleOnLoadMoreReferrals}
          loadMoreDisable={referralPagination.hasMore}
          onReload={reloadReferrals}
          rows={referralRows}
          showColumnCheck
          headCells={headCellReferralPayment}
          onClickButton={handleOnClickReferral}
          showColumnButton
          idName="invitee"
          disableByStatus={['PENDING_PAYMENT', 'PAYMENT_REJECTED']}
        />
      </Accordion>
      <Accordion
        title={t('newAffiliates')}
        filterValues={joinRequestFilterValues}
        filterRowsBy={filterNewUsersBy}
        handleOnFilter={filterValue => setFilterNewUsersBy(filterValue)}
      >
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
          handleOnRowsPerPageChange={handleOnRowPerPageChange}
          usePagination
        />
      </Accordion>
      <Accordion
        title={t('userManagement')}
        filterValues={userManagementFilterValues}
        filterRowsBy={filterRowsBy}
        handleOnFilter={filterValue => setFilterRowsBy(filterValue)}
      >
        <TableSearch
          tableName="management"
          onSelectItem={handleOnSelectItem}
          selected={selected.management || []}
          useLoadMore
          rows={userRows}
          showColumnCheck
          headCells={headCellUserApprovals}
          handleOnLoadMore={handleOnLoadMoreUsers}
          loadMoreDisable={userPagination.hasMore}
          onReload={reloadUsers}
          idName="username"
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
            onClickApproveNewUser={() => {
              approveNewUser()
              setOpenFAB(false)
            }}
            onClickReject={() => {
              setOpenInfoModal(true)
              setOpenFAB(false)
            }}
            onClickRemoveUsers={() => {
              handleOnRemoveUsers()
              setOpenFAB(false)
            }}
            onClickApprovePayment={() => {
              handleOnApprovePayment()
              setOpenFAB(false)
            }}
            onClickRejectPayment={() => {
              setRejectPayment({ isOpen: true, previousModal: 'optionFAB' })
              setOpenFAB(false)
            }}
            onClickReApprovePayment={() => {
              handleOnReApprovePayment()
              setOpenFAB(false)
            }}
            allowPayment={allowPayment}
            allowReApprove={allowReApprove}
          />
        </Box>
      </FloatingMenu>
      <AddUserModal
        onClose={() => setAddUser(false)}
        onSubmit={handleOnSubmitAddUser}
        t={t}
        open={openAddUser}
      />
      <RejectPaymentModal
        onClose={handleOnCloseRejectPaymentModal}
        onSubmit={handleOnRejectPayment}
        t={t}
        open={openRejectPayment.isOpen}
      />
      <HistoryModal
        referral={currentReferral}
        open={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      >
        {currentReferral?.statusId ===
          affiliateUtil.REFERRAL_STATUS[
            affiliateUtil.REFERRAL_STATUS_IDS.PENDING_PAYMENT
          ] && (
          <>
            <Typography>{t('approvePayment')}</Typography>
            <Box className={classes.modalBtnWrapper}>
              <Button
                variant="contained"
                onClick={() => {
                  setRejectPayment({ isOpen: true, previousModal: 'history' })
                  setIsHistoryModalOpen(false)
                }}
                className={clsx(classes.timelineBtn, classes.reject)}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnApprovePayment}
                className={classes.timelineBtn}
              >
                Yes
              </Button>
            </Box>
          </>
        )}
        {currentReferral?.statusId ===
          affiliateUtil.REFERRAL_STATUS[
            affiliateUtil.REFERRAL_STATUS_IDS.PENDING_KYC_VERIFICATION
          ] &&
          mainConfig.isTestnet && (
            <>
              <Typography>{t('approveKYC')}</Typography>
              <Box
                className={clsx(classes.modalBtnWrapper, classes.singleItem)}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnApproveKyc}
                  className={classes.timelineBtn}
                >
                  Yes
                </Button>
              </Box>
            </>
          )}
      </HistoryModal>
      <Modal open={openInfoModal} setOpen={setOpenInfoModal}>
        <Box className={classes.rejectModal}>
          <Typography className={classes.text}>
            {`${t('rejectUserMessage')} ${getAccountName()}`}
          </Typography>
          <Box className={classes.btnAddAccount}>
            <Button onClick={() => setOpenInfoModal(false)}>
              {t('cancel')}
            </Button>
            <Button color="primary" onClick={deleteNewUsers}>
              {loadingDelete || loadingRejectJoinRequest ? (
                <CircularProgress color="primary" size={24} />
              ) : (
                t('reject')
              )}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={fetchingData} setOpen={setOpenInfoModal}>
        <Box className={classes.loaderModal}>
          <Loader />
        </Box>
      </Modal>
    </Box>
  )
}

export default Admin
