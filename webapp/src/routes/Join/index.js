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
