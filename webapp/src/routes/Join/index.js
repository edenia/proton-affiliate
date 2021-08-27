import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation } from '@apollo/client'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import DoneIcon from '@material-ui/icons/Done'
import Chip from '@material-ui/core/Chip'
import TimerIcon from '@material-ui/icons/Timer'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import LinearProgress from '@material-ui/core/LinearProgress'

import Modal from '../../components/Modal'
import useDebounce from '../../hooks/useDebounce'
import SearchForm from '../../components/SearchForm'
import useCountries from '../../hooks/useCountries'
import HistoryModal from '../../components/HistoryModal'
import AutocompleteInput from '../../components/Autocomplete'
import {
  affiliateUtil,
  getLastCharacters,
  formatWithThousandSeparator,
  useImperativeQuery
} from '../../utils'
import { mainConfig } from '../../config'
import { ADD_REFERRAL_MUTATION, GET_REFERRAL_BY_INVITEE } from '../../gql'
import { useSharedState } from '../../context/state.context'

import styles from './styles'
import appStore from './appStore.svg'
import googlePlay from './googlePlay.svg'

const TIME_BEFORE_IRREVERSIBILITY = 164
const INIT_VALIDATION_VALUES = {
  showHelper: false,
  message: '',
  isValid: false
}
const useStyles = makeStyles(styles)

const Join = () => {
  const { t, i18n } = useTranslation('joinRoute')
  const classes = useStyles()
  const [, { showMessage }] = useSharedState()
  const [params, setParams] = useState({})
  const { referrer } = useParams()
  const [open, setOpen] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [statesByCountry, setStatesBycountrues] = useState([])
  const [accountNameError, setAccountNameError] = useState(
    INIT_VALIDATION_VALUES
  )
  const [inputs, setInputs] = useState({
    fullname: { value: '' },
    address: { value: '' },
    country: { value: '' },
    state: { value: '' },
    date: { value: '' }
  })
  const debouncedAccount = useDebounce(accountName, 200)
  const countries = useCountries(i18n.languages[1])
  const [isValidReferrer, setIsValidReferrer] = useState(false)
  const [loadingValidation, setLoadingValidation] = useState(true)
  const [addReferral, { loading }] = useMutation(ADD_REFERRAL_MUTATION)
  const [irreversibilityCounter, setIrreversibilityCounter] = useState(0)
  const [invitee, setInvitee] = useState('')
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [currentReferral, setCurrentReferral] = useState()
  const loadReferralByInvitee = useImperativeQuery(GET_REFERRAL_BY_INVITEE)

  const searchReferral = async invitee => {
    const { data } = await loadReferralByInvitee({ invitee })

    if (data.referrals.length < 1) {
      showMessage({
        type: 'warning',
        content: t('referralNotFound', { invitee })
      })

      return
    }

    console.log('teto')

    setCurrentReferral(data.referrals[0])
    setIsHistoryModalOpen(true)
  }

  const handleOnChange = e => {
    setAccountName(e.target.value)
  }

  const startCounter = () => {
    setTimeout(() => {
      setIrreversibilityCounter(prev => {
        if (prev > 0) {
          startCounter()
        }

        return prev - 1
      })
    }, 1000)
  }

  const handleOnSubmit = async event => {
    event.preventDefault()

    try {
      const {
        data: {
          add_referral: { trxid }
        }
      } = await addReferral({
        variables: {
          referrer,
          invitee: accountName
        }
      })

      setIrreversibilityCounter(TIME_BEFORE_IRREVERSIBILITY)
      startCounter()
      showMessage({
        type: 'success',
        content: (
          <a
            href={`${mainConfig.blockExplorer}/transaction/${trxid}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(trxid)}`}
          </a>
        )
      })
      setOpen(true)
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  const handleOnChangeInputs = (inputName, value) => {
    if (inputName === 'country') {
      setStatesBycountrues(value.states)
      setInputs({ ...inputs, [inputName]: value.value })

      return
    }

    setInputs({ ...inputs, [inputName]: value })
  }

  useEffect(() => {
    const validateAccount = async () => {
      const isValid = await affiliateUtil.isAccountValidAsInvitee(
        debouncedAccount
      )

      setAccountNameError({
        showHelper: true,
        isValid: isValid,
        message: t(isValid ? 'accountHelperText' : 'accountHelperError')
      })
    }

    if (debouncedAccount) {
      validateAccount()
    } else {
      setAccountNameError({
        showHelper: false,
        message: '',
        isValid: false
      })
    }
  }, [debouncedAccount])

  useEffect(() => {
    const validateReferrer = async () => {
      const isValid = await affiliateUtil.isAccountValidAsReferrer(referrer)
      setIsValidReferrer(isValid)
      setLoadingValidation(false)
    }

    validateReferrer()
  }, [referrer])

  useEffect(() => {
    const loadParams = async () => {
      const params = await affiliateUtil.getParams()
      setParams(params)
    }

    loadParams()
  }, [])

  if (loadingValidation)
    return (
      <Box className={classes.joinPage}>
        <Box className={classes.joinHead}>
          <LinearProgress className={classes.progress} />
        </Box>
      </Box>
    )

  if (!isValidReferrer)
    return (
      <Box className={classes.joinPage}>
        <Box className={classes.joinHead}>
          <Typography variant="h1" className={classes.joinTitle}>
            {t('title')}
          </Typography>
          <ReportProblemOutlinedIcon className={classes.invalidIcon} />
          <Typography variant="h1" className={classes.invalidLink}>
            {t('invalidLink')}
          </Typography>
          <Typography className={classes.invalidInfo}>
            {t('invalidInfo')}
          </Typography>
          <Link to="/" className={classes.invalidBtn}>
            {t('goToHome')}
          </Link>
        </Box>
      </Box>
    )

  return (
    <Box className={classes.joinPage}>
      <Box className={classes.joinHead}>
        <Typography variant="h1" className={classes.joinTitle}>
          {t('title')}
        </Typography>
        <Typography className={classes.joinInfo}>
          {t('infoPage', {
            reward: formatWithThousandSeparator(params.usd_reward_amount, 2),
            referrer
          })}
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className={clsx(classes.step, {
            [classes.showBox]: isValidReferrer
          })}
        >
          <Typography className={classes.joinStep}>{t('step1')}</Typography>
          <TextField
            className={clsx(classes.textField, classes.marginMd)}
            id="filled-account"
            label={t('account')}
            variant="filled"
            value={accountName}
            onChange={handleOnChange}
            disabled={open}
            InputProps={{
              endAdornment: accountNameError.isValid ? (
                <DoneIcon color="primary" />
              ) : (
                <></>
              )
            }}
          />
          {accountNameError.showHelper && (
            <Typography className={clsx(classes.helperText, classes.marginMd)}>
              {accountNameError.message}
            </Typography>
          )}
          {!open && (
            <Button
              variant="contained"
              color="primary"
              disabled={!accountNameError.isValid}
              className={clsx(classes.sendBtn, classes.marginMd)}
              onClick={handleOnSubmit}
            >
              {loading ? (
                <CircularProgress color="secondary" size={20} />
              ) : (
                'Send'
              )}
            </Button>
          )}
        </form>

        <Box
          className={clsx(classes.step, {
            [classes.showBox]: open
          })}
        >
          <Typography className={classes.joinStep}>{t('step2')}</Typography>
          <Typography className={classes.joinStepInfo}>
            {t('step2Info')}
          </Typography>

          <Box className={classes.btnWrapper}>
            <Box
              className={classes.appleBtn}
              onClick={() =>
                window.open(
                  'https://apps.apple.com/us/app/proton-wallet/id1516536231',
                  '_blank'
                )
              }
            >
              <img src={appStore} />
            </Box>

            <Box
              className={classes.googleBtn}
              onClick={() =>
                window.open(
                  'https://play.google.com/store/apps/details?id=com.metallicus.protonwallet&hl=en&gl=US',
                  '_blank'
                )
              }
            >
              <img src={googlePlay} />
            </Box>
          </Box>
        </Box>
        <Box
          className={clsx(classes.step, {
            [classes.showBox]: open
          })}
        >
          <Typography className={classes.joinStep}>{t('step4')}</Typography>
          <Typography className={classes.joinStepInfo}>
            {t('step4Info')}
          </Typography>
          {irreversibilityCounter > 0 && (
            <Chip
              className={classes.irreversibilityStatus}
              icon={<TimerIcon />}
              label={t('pendingIrreversibility', {
                seconds: irreversibilityCounter
              })}
              variant="outlined"
            />
          )}

          {irreversibilityCounter < 1 && (
            <Box className={classes.checkWrapper}>
              <SearchForm
                handleOnChange={setInvitee}
                handleOnClick={searchReferral}
                value={invitee}
              />
              <Chip
                className={classes.irreversibilityStatus}
                icon={<DoneIcon />}
                label={t('doneIrreversibility')}
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
        <Box className={clsx(classes.step, { [classes.showBox]: false })}>
          <Typography className={classes.joinStep}>{t('step4')}</Typography>
          <Box style={{ display: 'flex', flexWrap: 'wrap', width: 700 }}>
            <TextField
              className={clsx(classes.textField, classes.marginMd)}
              id="filled-fullName"
              onChange={e => handleOnChangeInputs('fullname', e.target.value)}
              value={inputs.fullname.value}
              label="Full Name"
              variant="filled"
            />
            <TextField
              className={clsx(classes.textField, classes.marginLeft)}
              id="filled-address"
              onChange={e => handleOnChangeInputs('address', e.target.value)}
              value={inputs.address.value}
              label="Address"
              variant="filled"
            />
            <AutocompleteInput
              styles={classes.marginMd}
              data={countries}
              label="Country"
              onHandleSelect={handleOnChangeInputs}
              name="country"
            />
            <AutocompleteInput
              styles={classes.marginLeft}
              data={statesByCountry}
              label="Provice or State"
              onHandleSelect={handleOnChangeInputs}
              name="state"
            />
            <TextField
              className={clsx(classes.textField, classes.marginMd)}
              id="filled-dateBirth"
              onChange={e => handleOnChangeInputs('date', e.target.value)}
              value={inputs.date.value}
              label="Date of Birth"
              variant="filled"
            />
          </Box>
        </Box>
      </Box>
      <Modal open={false} setOpen={setOpen}>
        <Box className={classes.congratsModal}>
          <Typography className={clsx(classes.joinTitle, classes.modalTitle)}>
            {t('modalTitle')}
          </Typography>
          <Typography className={clsx(classes.joinStepInfo, classes.reward)}>
            {t('info')}
          </Typography>
          <Typography
            className={clsx(classes.joinStepInfo, classes.rewardInfo)}
          >
            {t('info2')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.moadalJoinBtn}
          >
            {t('buttonLabel')}
          </Button>
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

export default Join
