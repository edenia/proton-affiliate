import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import { useLazyQuery } from '@apollo/client'
import AddIcon from '@material-ui/icons/Add'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Box from '@material-ui/core/Box'

import TableSearch from '../../components/TableSearch'
import Accordion from '../../components/Accordion'
import FloatingMenu from '../../components/FloatingButon'
import { GET_REFERRAL_QUERY } from '../../gql'
import { affiliateUtil } from '../../utils'

import styles from './styles'

const headCellUserApprovals = [
  { id: 'username', align: 'left', label: 'username' },
  { id: 'status', align: 'center', label: 'status' },
  { id: 'reward', align: 'center', label: 'reward' },
  { id: 'tx', align: 'center', label: 'tx' }
]
const headCellReferralPayment = [
  { id: 'invitee', align: 'left', label: 'invitee' },
  { id: 'status', align: 'center', label: 'status' },
  { id: 'referrer', align: 'center', label: 'referrer' },
  { id: 'tx', align: 'center', label: 'last tx' }
]
const initReferralPagination = {
  count: 0,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25],
  page: 0
}

const useStyles = makeStyles(styles)

const Admin = () => {
  const classes = useStyles()
  const { t } = useTranslation('adminRoute')
  const [loadReferrals, { loading = true, data: { referrals, info } = {} }] =
    useLazyQuery(GET_REFERRAL_QUERY)
  const [referralPagination, setReferralPagination] = useState(
    initReferralPagination
  )
  const [referralRows, setReferralRows] = useState([])
  const [userRows, setUserRows] = useState([])
  const [userPagination, setUserPagination] = useState({})

  const handleOnPageChange = (_, page) => {
    setReferralPagination(prev => ({
      ...prev,
      page
    }))

    loadReferrals({
      variables: {
        offset: page * referralPagination.rowsPerPage,
        limit: referralPagination.rowsPerPage
      }
    })
  }

  const handleOnLoadMore = async () => {
    const users = await affiliateUtil.getUsers(userPagination.cursor)
    const data = (users.rows || []).map(item => ({
      username: item.user,
      status: '-',
      reward: '-',
      tx: '-'
    }))

    setUserRows([...userRows, ...data])
    setUserPagination({
      hasMore: users.hasMore,
      cursor: users.cursor
    })
  }

  useEffect(() => {
    handleOnLoadMore()
    loadReferrals({
      variables: {
        offset: 0,
        limit: 5
      }
    })
  }, [])

  useEffect(() => {
    if (loading || !referrals) return

    const data = (referrals || []).map(item => ({
      invitee: item.invitee,
      status: item.status,
      referrer: item.referrer,
      tx: '-'
    }))

    setReferralPagination({
      ...referralPagination,
      count: info.referrals.count
    })
    setReferralRows(data)
  }, [loading, referrals, info])

  return (
    <Box className={classes.adminPage}>
      <Box className={classes.adminHead}>
        <Typography className={classes.adminTitle}>{t('title')}</Typography>
        <Typography className={classes.adminInfo}>{t('pageInfo')}</Typography>
      </Box>
      <Accordion title="User Approvals">
        <TableSearch
          rows={userRows}
          showColumnCheck
          headCells={headCellUserApprovals}
          useLoadMore
          handleOnLoadMore={handleOnLoadMore}
        />
      </Accordion>
      <Accordion title="Referral Payments">
        <TableSearch
          headCells={headCellReferralPayment}
          showColumnCheck
          rows={referralRows}
          pagination={referralPagination}
          handleOnPageChange={handleOnPageChange}
          handleOnRowsPerPageChange={() => {}}
          usePagination
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
    </Box>
  )
}

export default Admin
