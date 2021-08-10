import React, { memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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

import { affiliateUtil } from '../../utils'
import { GET_REFERRAL_HISTORY, ADD_JOIN_REQUEST_MUTATION } from '../../gql'
import useDebounce from '../../hooks/useDebounce'
import TableSearch from '../../components/TableSearch'
import Modal from '../../components/Modal'
import { useSharedState } from '../../context/state.context'

import styles from './styles'
import HomeSvg from './home.svg'

const dateFormat = blockTime => {
  const currentData = moment()
  const diff = currentData.diff(moment(blockTime), 'days')

  if (diff === 0) return 'Today'

  return moment(blockTime).format('ll')
}

const headCellLAstReward = [
  { id: 'username', align: 'left', label: 'account' },
  { id: 'date', align: 'center', label: 'joined' },
  { id: 'reward', align: 'center', label: 'reward (XPR)' },
  { id: 'tx', align: 'right', label: 'tx id' }
]
const useStyles = makeStyles(styles)

const Home = () => {
  const classes = useStyles()
  const { t } = useTranslation('homeRoute')
  const [, { showMessage }] = useSharedState()
  const [getLastReferral, { loading, data }] =
    useLazyQuery(GET_REFERRAL_HISTORY)
  const [addJoinRequest, { loading: loadingJoin }] = useMutation(
    ADD_JOIN_REQUEST_MUTATION
  )
  const [open, setOpen] = useState(false)
  const [checked, setCheked] = useState(false)
  const [account, setAccount] = useState('')
  const [mail, setMail] = useState('')
  const [isValidAccount, setIsValidAccount] = useState(false)
  const debouncedSearchTerm = useDebounce(account, 200)
  const [referralRows, setReferralRows] = useState([])

  const handleOnChangeAccount = e => {
    setAccount(e.target.value)
  }

  const handleOnChangeMail = e => {
    setMail(e.target.value)
  }

  const handleAddJoinRequest = async () => {
    try {
      await addJoinRequest({
        variables: {
          user: {
            account,
            email: mail,
            receive_news: checked
          }
        }
      })

      handleCloseModal()
      showMessage({
        type: 'success',
        content: t('success')
      })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handleCloseModal = () => {
    setCheked(false)
    setOpen(false)
  }

  useEffect(() => {
    const validateAccount = async () => {
      const isValid = await affiliateUtil.isAccountValidAsInvitee(
        debouncedSearchTerm
      )

      setIsValidAccount(!isValid)
    }

    if (debouncedSearchTerm) {
      validateAccount()
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (loading || !data) return

    const lastReferrals = (data.referral_history || []).map(item => ({
      username: item.invitee,
      date: dateFormat(item.block_time),
      reward: '-',
      tx: (item.trxid || '').slice(0, 7)
    }))

    setReferralRows(lastReferrals)
  }, [data, loading])

  useEffect(() => {
    getLastReferral()
  }, [])

  return (
    <Box className={classes.homePage}>
      <Box className={classes.infoBox}>
        <Box className="left">
          <Box className={classes.title}>
            <Typography className={classes.onChain}>{t('title')}</Typography>
            <Typography className={classes.referralText}>
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
            onClick={() => setOpen(true)}
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

      <Box className={classes.lastReferral}>
        <Typography variant="h5" className={classes.tableTitle}>
          {t('tableTitle')}
        </Typography>
      </Box>

      <TableSearch
        headCells={headCellLAstReward || []}
        rows={referralRows || []}
      />

      <Modal open={open} setOpen={setOpen}>
        <Box className={classes.joinModel}>
          <Typography className={classes.joinText}>{t('modalInfo')}</Typography>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              onChange={handleOnChangeAccount}
              value={account}
              id="filled-account"
              label={t('account')}
              variant="filled"
              InputProps={{
                endAdornment: isValidAccount ? (
                  <DoneIcon color="primary" />
                ) : (
                  <></>
                )
              }}
            />
            {isValidAccount && (
              <Typography className={classes.helperText}>
                {t('accountHelperText')}
              </Typography>
            )}
            <TextField
              className={classes.textField}
              onChange={handleOnChangeMail}
              value={mail}
              id="filled-email"
              label={t('address')}
              variant="filled"
            />
          </form>
          <FormControlLabel
            className={classes.checkBoxReceive}
            control={
              <Switch
                checked={checked}
                onChange={() => setCheked(!checked)}
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
              disabled={!isValidAccount}
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
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)
