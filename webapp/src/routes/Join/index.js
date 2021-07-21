import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation } from '@apollo/client'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import DoneIcon from '@material-ui/icons/Done'

import Modal from '../../components/Modal'
import useDebounce from '../../hooks/useDebounce'
import useCountries from '../../hooks/useCountries'
import AutocompleteInput from '../../components/Autocomplete'
import { affiliateUtil } from '../../utils'
import { ADD_REFERRAL_MUTATION } from '../../gql'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const Join = () => {
  const { t, i18n } = useTranslation('joinRoute')
  const classes = useStyles()
  const [, { showMessage }] = useSharedState()
  const { referrer } = useParams()
  const [open, setOpen] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [statesByCountry, setStatesBycountrues] = useState([])
  const [accountNameError, setAccountNameError] = useState({})
  const [state] = useSharedState()
  const [inputs, setInputs] = useState({
    fullname: { value: '' },
    address: { value: '' },
    country: { value: '' },
    state: { value: '' },
    date: { value: '' }
  })
  const debouncedSearchTerm = useDebounce(accountName, 200)
  const countries = useCountries(i18n.languages[1])
  const [isValidReferrer, setIsValidReferrer] = useState(false)
  const [addReferral, { loading }] = useMutation(ADD_REFERRAL_MUTATION)

  const handleOnChange = e => {
    setAccountName(e.target.value)
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

      showMessage({ type: 'success', content: `${t('success')} ${trxid}` })
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
    const validateInvitee = async () => {
      const isValid = await affiliateUtil.isAccountValidAsInvitee(
        debouncedSearchTerm
      )
      setAccountNameError({
        isError: !isValid,
        showMessage: isValid,
        message: 'helperTextUsername',
        showIcon: isValid
      })
    }

    if (debouncedSearchTerm.length && debouncedSearchTerm.length < 10) {
      setAccountNameError({
        isError: true,
        showMessage: true,
        message: 'helperTextUsernameError',
        showIcon: false
      })
    }

    if (debouncedSearchTerm) {
      validateInvitee()
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    const validateReferrer = async () => {
      const isValid = await affiliateUtil.isAccountValidAsReferrer(referrer)
      setIsValidReferrer(isValid)
    }

    validateReferrer()
  }, [referrer])

  return (
    <Box className={classes.joinPage}>
      <Box className={classes.joinHead}>
        <Typography className={classes.joinTitle}>{t('title')}</Typography>
        <Typography className={classes.joinInfo}>{t('infoPage')}</Typography>

        {!isValidReferrer && (
          <Typography>
            {t('invalidReferrer')}: {referrer}
          </Typography>
        )}

        <Box className={clsx(classes.step, { [classes.showBox]: true })}>
          <Typography className={classes.joinStep}>{t('step1')}</Typography>
          <TextField
            className={classes.textField}
            id="filled-account"
            label={t('account')}
            variant="filled"
            value={accountName}
            onChange={handleOnChange}
            InputProps={{
              endAdornment: accountNameError.showIcon ? (
                <DoneIcon color="primary" />
              ) : (
                <></>
              )
            }}
          />
          {accountNameError.showMessage && (
            <Typography className={classes.helperText}>
              {t(accountNameError.message)}
            </Typography>
          )}
        </Box>

        <Box
          className={clsx(classes.step, {
            [classes.showBox]: accountNameError.showIcon || state.user
          })}
        >
          <Typography className={classes.joinStep}>{t('step2')}</Typography>
          <Typography className={classes.joinInfo}>{t('step2Info')}</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.storeBtn}
          >
            Play Store
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.storeBtn}
          >
            App Store
          </Button>
        </Box>

        <Box
          className={clsx(classes.step, {
            [classes.showBox]: accountNameError.showIcon || state.user
          })}
        >
          <Typography className={classes.joinStep}>{t('step3')}</Typography>
          {state.user ? (
            <Typography className={classes.accountName}>
              {`Welcome ${state.user.accountName}`}
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.storeBtn}
            >
              {t('login')}
            </Button>
          )}
        </Box>

        <Box className={clsx(classes.step, { [classes.showBox]: state.user })}>
          <Typography className={classes.joinStep}>{t('step4')}</Typography>
          <TextField
            className={classes.textField}
            id="filled-fullName"
            onChange={e => handleOnChangeInputs('fullname', e.target.value)}
            value={inputs.fullname.value}
            label="Full Name"
            variant="filled"
          />
          <TextField
            className={classes.textField}
            id="filled-address"
            onChange={e => handleOnChangeInputs('address', e.target.value)}
            value={inputs.address.value}
            label="Address"
            variant="filled"
          />
          <AutocompleteInput
            data={countries}
            label="Country"
            onHandleSelect={handleOnChangeInputs}
            name="country"
          />
          <AutocompleteInput
            data={statesByCountry}
            label="Provice or State"
            onHandleSelect={handleOnChangeInputs}
            name="state"
          />
          <TextField
            className={classes.textField}
            id="filled-dateBirth"
            onChange={e => handleOnChangeInputs('date', e.target.value)}
            value={inputs.date.value}
            label="Date of Birth"
            variant="filled"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.sendBtn}
            onClick={handleOnSubmit}
          >
            {loading ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              'Send'
            )}
          </Button>
        </Box>
      </Box>
      <Modal open={open} setOpen={setOpen}>
        <Box className={classes.congratsModal}>
          <Typography className={clsx(classes.joinTitle, classes.modalTitle)}>
            {t('modalTitle')}
          </Typography>
          <Typography className={clsx(classes.joinInfo, classes.reward)}>
            {t('info')}
          </Typography>
          <Typography className={clsx(classes.joinInfo, classes.rewardInfo)}>
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
    </Box>
  )
}

export default Join
