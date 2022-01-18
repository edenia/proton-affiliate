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
  DELETE_JOIN_REQUEST_MUTATION,
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
    id: 'kyc',
    align: 'center',
    useMainColor: false,
    rowLink: false,
    label: 'kyc'
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
    label: 'Total Rewards'
  },
  {
    id: 'txid',
    align: 'right',
    useMainColor: true,
    rowLink: false,
    label: 'Last TX'
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
  onClickApproveNewUser,
  allowPayment
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
  allowPayment: PropTypes.bool
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
    { loading = true, data: { joinRequest, infoJoin } = {} }
  ] = useLazyQuery(GET_JOIN_REQUEST, { fetchPolicy: 'network-only' })
  const [deleteJoinRequest, { loading: loadingDelete }] = useMutation(
    DELETE_JOIN_REQUEST_MUTATION
  )
  const [sendConfirmation] = useMutation(SEND_CONFIRMATION_MUTATION)
  const [updateJoinRequest] = useMutation(UPDATE_JOIN_REQUEST_MUTATION)
  const [openAddUser, setAddUser] = useState(false)
  const [openRejectPayment, setRejectPayment] = useState({
    isOpen: false,
    previousModal: null
  })
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [allowPayment, setAllowPayment] = useState(false)
  const [newUsersRows, setNewUserRows] = useState([])
  const [newUsersPagination, setNewUsersPagination] = useState(
    initNewUsersPagination
  )
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
        txid: getLastCharacters(trxid) || '-'
      }
    })

    setUserPagination({
      hasMore: users.hasMore,
      cursor: users.cursor
    })
    setUserRows(pagination.cursor ? [...userRows, ...newRows] : newRows)
  }

  const deleteNewUsers = async (showSnack = true) => {
    try {
      await deleteJoinRequest({
        variables: {
          where: { id: { _in: selected.new } }
        }
      })

      await loadNewUsers({
        variables: {
          offset: newUsersPagination.page * newUsersPagination.rowsPerPage,
          limit: newUsersPagination.rowsPerPage,
          where: {
            state: { _eq: affiliateUtil.JOIN_REQUEST_STATUS.pending }
          }
        }
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
          state: affiliateUtil.JOIN_REQUEST_STATUS.approved
        }
      })

      setAddUser(false)

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
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const reloadUsers = () => {
    setUserPagination({
      hasMore: false,
      cursor: ''
    })
    setTimeout(handleOnLoadMoreUsers, 1500)
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

    await loadNewUsers({
      variables: {
        offset: page * newUsersPagination.rowsPerPage,
        limit: newUsersPagination.rowsPerPage,
        where: {
          state: { _eq: affiliateUtil.JOIN_REQUEST_STATUS.pending }
        }
      }
    })
  }

  const handleOnRowPerPageChange = async e => {
    setNewUsersPagination(prev => ({
      ...prev,
      rowsPerPage: e.target.value
    }))

    await loadNewUsers({
      variables: {
        offset: newUsersPagination.page * e.target.value,
        limit: e.target.value,
        where: {
          state: { _eq: affiliateUtil.JOIN_REQUEST_STATUS.pending }
        }
      }
    })
  }

  const handleOnLoadMoreReferrals = async usePagination => {
    const pagination = usePagination ? referralPagination : {}
    const referrals = await affiliateUtil.getReferrals(pagination.cursor)
    const invitees = (referrals.rows || []).map(item => item.invitee)
    const { data } = await loadHistoryByInvites({ invitees })
    const newRows = (referrals.rows || []).map(row => {
      const history = data.history.filter(item => item.invitee === row.invitee)

      return {
        ...row,
        history,
        status: t(row.status),
        statusId: row.status
      }
    })

    setReferralPagination({
      hasMore: referrals.hasMore,
      cursor: referrals.cursor
    })
    setReferralRows(pagination.cursor ? [...referralRows, ...newRows] : newRows)
  }

  const reloadReferrals = () => {
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

  useEffect(() => {
    if (loading || !joinRequest) return

    const setUserData = async () => {
      const data = await Promise.all(
        (joinRequest || []).map(async item => {
          const hasKYC = await affiliateUtil.checkKyc(item.account)
          return {
            ...item,
            account: item.account,
            kyc: hasKYC ? t('verified') : t('pending'),
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
  }, [loading, joinRequest, infoJoin])

  useEffect(() => {
    if (selected.tableName !== 'payment') {
      return
    }

    const selectedItems = selected[selected.tableName] || []
    const notAllowed = referralRows
      .filter(row => selectedItems.includes(row.invitee))
      .find(
        row =>
          row.statusId !==
          affiliateUtil.REFERRAL_STATUS[
            affiliateUtil.REFERRAL_STATUS_IDS.PENDING_PAYMENT
          ]
      )

    setAllowPayment(!notAllowed)
  }, [selected, referralRows, setAllowPayment])

  useEffect(() => {
    handleOnLoadMoreUsers()
    handleOnLoadMoreReferrals()
    loadNewUsers({
      variables: {
        offset: 0,
        limit: 5,
        where: {
          state: { _eq: affiliateUtil.JOIN_REQUEST_STATUS.pending }
        }
      }
    })
  }, [])

  useEffect(() => {
    reloadUsers()
  }, [filterRowsBy])

  return (
    <Box className={classes.adminPage}>
      <Box className={classes.adminHead}>
        <Typography variant="h1" className={classes.adminTitle}>
          {t('title')}
        </Typography>
        <Typography className={classes.adminInfo}>{t('pageInfo')}</Typography>
      </Box>
      <Accordion title="Referral Payments">
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
          disableByStatus="PENDING_PAYMENT"
        />
      </Accordion>
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
          handleOnRowsPerPageChange={handleOnRowPerPageChange}
          usePagination
        />
      </Accordion>
      <Accordion
        title="User Management"
        filterValues={[
          t('menuAllRoles'),
          t('menuAdminRole'),
          t('menuReferrerRole')
        ]}
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
            allowPayment={allowPayment}
            onClickApproveNewUser={() => {
              approveNewUser()
              setOpenFAB(false)
            }}
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
              {loadingDelete ? (
                <CircularProgress color="primary" size={24} />
              ) : (
                t('reject')
              )}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openInfoModal || true} setOpen={setOpenInfoModal}>
        <Box className={classes.rejectModal}>
          <Loader />
        </Box>
      </Modal>
    </Box>
  )
}

export default Admin
