import React, { memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useLazyQuery, useMutation } from '@apollo/client'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DoneIcon from '@material-ui/icons/Done'
import CircularProgress from '@material-ui/core/CircularProgress'

import { affiliateUtil, useImperativeQuery } from '../../utils'
import {
  GET_REWARDS_HISTORY,
  GET_REFERRAL_BY_INVITEE,
  ADD_JOIN_REQUEST_MUTATION,
  GET_JOIN_REQUEST
} from '../../gql'
import TableSearch from '../../components/TableSearch'
import Modal from '../../components/Modal'
import HistoryModal from '../../components/HistoryModal'
import SearchForm from '../../components/SearchForm'
import { useSharedState } from '../../context/state.context'

import styles from './styles'
import HomeSvg from './home.svg'

const dateFormat = blockTime => {
  const currentData = moment()
  const diff = currentData.diff(moment(blockTime), 'days')

  if (diff === 0) return 'Today'

  return moment(blockTime).format('ll')
}
const INIT_VALIDATION_VALUES = {
  showHelper: false,
  message: '',
  isValid: false
}
const headCellLAstReward = [
  { id: 'username', align: 'left', rowLink: true, label: 'account' },
  { id: 'reward', align: 'center', rowLink: false, label: 'reward (XPR)' },
  { id: 'date', align: 'center', rowLink: false, label: 'joined' }
]
const useStyles = makeStyles(styles)

const Home = () => {
  const classes = useStyles()
  const { t } = useTranslation('homeRoute')
  const location = useLocation()
  const [state, { login, showMessage }] = useSharedState()
  const [getLastReferral, { loading, data }] = useLazyQuery(GET_REWARDS_HISTORY)
  const loadReferralByInvitee = useImperativeQuery(GET_REFERRAL_BY_INVITEE)
  const [addJoinRequest, { loading: loadingJoin }] = useMutation(
    ADD_JOIN_REQUEST_MUTATION
  )
  const getJoinRequestUsers = useImperativeQuery(GET_JOIN_REQUEST)
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const [account, setAccount] = useState('')
  const [email, setEmail] = useState('')
  const [invitee, setInvitee] = useState('')
  const [isValidAccount, setIsValidAccount] = useState(INIT_VALIDATION_VALUES)
  const [isValidEmail, setIsValidEmail] = useState(INIT_VALIDATION_VALUES)
  const [referralRows, setReferralRows] = useState([])
  const [currentReferral, setCurrentReferral] = useState()
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)

  const handleOnChangeMail = e => {
    setEmail(e.target.value)

    if (!e.target.value.length) {
      setIsValidEmail({
        showHelper: false,
        message: '',
        isValid: false
      })

      return
    }

    if (/(.+)@(.+){2,}\.(.+){2,}/.test(e.target.value)) {
      setIsValidEmail({
        showHelper: true,
        message: t('emailHelperText'),
        isValid: true
      })
    } else {
      setIsValidEmail({
        showHelper: true,
        message: t('emailHelperError'),
        isValid: false
      })
    }
  }

  const handleAddJoinRequest = async () => {
    try {
      await addJoinRequest({
        variables: {
          user: {
            account: account,
            email,
            receive_news: checked
          }
        }
      })

      handleCloseModal()
      showMessage({
        type: 'success',
        content: t('success')
      })
      setChecked(false)
      setEmail('')
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handleCloseModal = () => {
    setIsValidEmail(INIT_VALIDATION_VALUES)
    setChecked(false)
    setOpen(false)
    setEmail('')
  }

  const handleOnClickReferral = data => {
    setIsHistoryModalOpen(true)
    setCurrentReferral(data.referral)
  }

  const searchReferral = async invitee => {
    const { data } = await loadReferralByInvitee({ invitee })

    if (data.referrals.length < 1) {
      showMessage({
        type: 'warning',
        content: t('referralNotFound', { invitee })
      })

      return
    }

    setCurrentReferral(data.referrals[0])
    setIsHistoryModalOpen(true)
  }

  const handleOpenApplyModal = () => {
    if (!account) {
      login()
      return
    }

    setOpen(true)
  }

  useEffect(() => {
    if (loading || !data) return

    const lastReferrals = (data.referral_history || []).map(item => ({
      ...item,
      username: item.invitee,
      date: dateFormat(item.block_time),
      reward: !item.payload.inviteePayment
        ? '-'
        : item.payload.inviteePayment.amount
    }))

    setReferralRows(lastReferrals)
  }, [data, loading])

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const invitee = query.get('invitee')
    setInvitee(invitee || '')

    if (invitee) {
      searchReferral(invitee)
    }
  }, [location.search])

  useEffect(() => {
    getLastReferral()
  }, [])

  useEffect(() => {
    setAccount(state.user ? state.user.accountName : '')
  }, [state.user])

  useEffect(() => {
    const validateAccount = async () => {
      const {
        data: { joinRequest }
      } = await getJoinRequestUsers({
        limit: 1,
        where: {
          account: { _eq: account },
          state: { _eq: affiliateUtil.JOIN_REQUEST_STATUS.pending }
        }
      })
      const isAnInvitee = await affiliateUtil.isAccountValidAsInvitee(account)

      const isValid = !!joinRequest.length || isAnInvitee

      setIsValidAccount({
        showHelper: true,
        isValid: !isValid,
        message: t(!isValid ? 'accountHelperText' : 'accountHelperError')
      })
    }

    if (account) {
      validateAccount()
    } else {
      setIsValidAccount({
        showHelper: false,
        message: '',
        isValid: false
      })
    }
  }, [account])

  return (
    <Box className={classes.homePage}>
      <Box className={classes.infoBox}>
        <Box className="left">
          <Box className={classes.title}>
            <Typography variant="h1" className={classes.onChain}>
              {t('title')}
            </Typography>
            <Typography variant="h1" className={classes.referralText}>
              {t('title2')}
            </Typography>
          </Box>
          <img
            src={HomeSvg}
            className={classes.imageSm}
            style={{ height: 193, width: 352 }}
          />
          <Typography className={classes.info}>{t('infoPage')}</Typography>
          <Button
            className={classes.joinBtn}
            variant="contained"
            color="primary"
            onClick={handleOpenApplyModal}
          >
            {t('buttonLabel')}
          </Button>
        </Box>
        <img
          src={HomeSvg}
          className={classes.imageMd}
          style={{ height: 328 }}
        />
      </Box>
      <SearchForm
        handleOnChange={setInvitee}
        handleOnClick={searchReferral}
        value={invitee}
      />

      <Box className={classes.lastReferral}>
        <Typography variant="h1" className={classes.tableTitle}>
          {t('tableTitle')}
        </Typography>
      </Box>
      <TableSearch
        headCells={headCellLAstReward || []}
        rows={referralRows || []}
        onClickButton={handleOnClickReferral}
        showColumnButton
      />

      <Modal open={open} setOpen={setOpen}>
        <Box className={classes.joinModel}>
          <Typography className={classes.joinText}>{t('modalInfo')}</Typography>
          <form noValidate autoComplete="off">
            <TextField
              disabled
              className={classes.textField}
              value={account}
              id="filled-account"
              label={t('account')}
              variant="filled"
              InputProps={{
                endAdornment: isValidAccount.isValid ? (
                  <DoneIcon color="primary" />
                ) : (
                  <></>
                )
              }}
            />
            {isValidAccount.showHelper && (
              <Typography className={classes.helperText}>
                {isValidAccount.message}
              </Typography>
            )}
            <TextField
              className={classes.textField}
              onChange={handleOnChangeMail}
              value={email}
              id="filled-email"
              label={t('address')}
              variant="filled"
              InputProps={{
                endAdornment: isValidEmail.isValid ? (
                  <DoneIcon color="primary" />
                ) : (
                  <></>
                )
              }}
            />
            {isValidEmail.showHelper && (
              <Typography className={classes.helperText}>
                {isValidEmail.message}
              </Typography>
            )}
          </form>
          <FormControlLabel
            className={classes.checkBoxReceive}
            control={
              <Switch
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="receive"
                color="primary"
              />
            }
            label={t('switchLabel')}
          />
          <Box className={classes.bntWrapper}>
            <Button onClick={handleCloseModal}>{t('cancel')}</Button>
            <Button
              color="primary"
              onClick={handleAddJoinRequest}
              disabled={!isValidEmail.isValid}
            >
              {loadingJoin ? (
                <CircularProgress color="primary" size={24} />
              ) : (
                t('save')
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
      <HistoryModal
        referral={currentReferral}
        open={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)
