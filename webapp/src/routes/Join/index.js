import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation } from '@apollo/client'

import { affiliateUtil } from '../../utils'
import { ADD_REFERRAL_MUTATION } from '../../gql'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const Join = () => {
  const { t } = useTranslation('joinRoute')
  const classes = useStyles()
  const [, { showMessage }] = useSharedState()
  const { referrer } = useParams()
  const [invitee, setInvitee] = useState('')
  const [isValidReferrer, setIsValidReferrer] = useState(false)
  const [isValidInvitee, setIsValidInvitee] = useState(false)
  const [addReferral, { loading }] = useMutation(ADD_REFERRAL_MUTATION)

  useEffect(() => {
    const validateReferrer = async () => {
      const isValid = await affiliateUtil.isAccountValidAsReferrer(referrer)
      setIsValidReferrer(isValid)
    }

    validateReferrer()
  }, [referrer])

  useEffect(() => {
    const validateInvitee = async () => {
      const isValid = await affiliateUtil.isAccountValidAsInvitee(invitee)
      setIsValidInvitee(isValid)
    }

    validateInvitee()
  }, [invitee])

  const handleOnChangeInvitee = async event => {
    setInvitee(event.target.value)
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
          invitee
        }
      })

      showMessage({ type: 'success', content: `${t('success')} ${trxid}` })
    } catch (error) {
      showMessage({ type: 'error', content: error.message })
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1">{t('title')}</Typography>
      </Grid>
      <Grid item xs={12}>
        {!isValidReferrer && (
          <Typography>
            {t('invalidReferrer')}: {referrer}
          </Typography>
        )}
        {isValidReferrer && (
          <form noValidate autoComplete="off" onSubmit={handleOnSubmit}>
            <Grid item xs={12}>
              <Typography>
                {t('referrer')}: {referrer}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!invitee && !isValidInvitee}
                value={invitee}
                variant="outlined"
                label={t('invitee')}
                onChange={handleOnChangeInvitee}
                helperText={!!invitee && !isValidInvitee && t('error')}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={loading || !invitee || !isValidInvitee}
              >
                {loading ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  t('confirm')
                )}
              </Button>
            </Grid>
          </form>
        )}
      </Grid>
    </Grid>
  )
}

export default Join

/*import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'
import Typography from '@material-ui/core/Typography'

import Modal from '../../components/Modal'
import useDebounce from '../../hooks/useDebounce'
import useCountries from '../../hooks/useCountries'
import { useSharedState } from '../../context/state.context'
import AutocompleteInput from '../../components/Autocomplete'

const useStyles = makeStyles(theme => ({
  joinHead: {
    padding: theme.spacing(4, 2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  joinPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  joinTitle: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: '#000000'
  },
  joinInfo: {
    fontWeight: '500',
    marginTop: theme.spacing(2),
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#6B717F'
  },
  joinStep: {
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: '#000000',
    width: '100%'
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  helperText: {
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: theme.spacing(2)
  },
  step: {
    marginTop: theme.spacing(4),
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  storeBtn: {
    margin: theme.spacing(1, 0),
    width: 200
  },
  congratsModal: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 2, 3),
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  modalTitle: {
    marginBottom: theme.spacing(4)
  },
  reward: {
    marginBottom: theme.spacing(2)
  },
  rewardInfo: {
    textAlign: 'center',
    marginBottom: theme.spacing(6)
  },
  moadalJoinBtn: {
    width: '100%'
  },
  showBox: {
    display: 'flex'
  },
  accountName: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.primary.main,
    margin: theme.spacing(1, 0)
  },
  sendBtn: {
    width: '100%',
    margin: theme.spacing(6, 0, 1, 0)
  }
}))

const Join = () => {
  const classes = useStyles()
  const { i18n } = useTranslation('joinRoute')
  const [open, setOpen] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [statesByCountry, setStatesBycountrues] = useState([])
  const [accountNameError, setAccountNameError] = useState('')
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

  const handleOnChange = e => {
    setAccountName(e.target.value)
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
    if (debouncedSearchTerm.length && debouncedSearchTerm.length < 10) {
      setAccountNameError({
        isError: true,
        showMessage: true,
        message: '*Non-standard account names',
        showIcon: false
      })
    }

    if (debouncedSearchTerm) {
      setAccountNameError({
        isError: false,
        showMessage: true,
        message: 'Username Available!',
        showIcon: true
      })
    }
  }, [debouncedSearchTerm])

  return (
    <Box className={classes.joinPage}>
      <Box className={classes.joinHead}>
        <Typography className={classes.joinTitle}>Join Proton!</Typography>
        <Typography className={classes.joinInfo}>
          John Smith invited you to the Proton Blockchain. Signup now and earn
          $10 in proton cryptocurrency.
        </Typography>
        <Box className={clsx(classes.step, { [classes.showBox]: true })}>
          <Typography className={classes.joinStep}>
            Step 1: Select your username.
          </Typography>
          <TextField
            className={classes.textField}
            id="filled-account"
            label="Account"
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
              {accountNameError.message}
            </Typography>
          )}
        </Box>

        <Box
          className={clsx(classes.step, {
            [classes.showBox]: accountNameError.showIcon || state.user
          })}
        >
          <Typography className={classes.joinStep}>
            Step 2: Download and Register
          </Typography>
          <Typography className={classes.joinInfo}>
            Download the Proton wallet. Please use the same username as above.
          </Typography>
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
          <Typography className={classes.joinStep}>
            Step 3: Login with your Wallet
          </Typography>
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
              Login
            </Button>
          )}
        </Box>

        <Box className={clsx(classes.step, { [classes.showBox]: state.user })}>
          <Typography className={classes.joinStep}>
            Step 4: Complete KYC
          </Typography>
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
            onClick={() => setOpen(true)}
          >
            Send
          </Button>
        </Box>
      </Box>
      <Modal open={open} setOpen={setOpen}>
        <Box className={classes.congratsModal}>
          <Typography className={clsx(classes.joinTitle, classes.modalTitle)}>
            Congratulations!
          </Typography>
          <Typography className={clsx(classes.joinInfo, classes.reward)}>
            Your $10 reward its in the way!
          </Typography>
          <Typography className={clsx(classes.joinInfo, classes.rewardInfo)}>
            Join the referral program, invite friends or family and obtain $10
            more for each completed registration.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.moadalJoinBtn}
          >
            JOIN AND INVITE
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default Join*/
