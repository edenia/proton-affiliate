import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { affiliateUtil, getUALError, getLastCharacters } from '../../utils'
import { useSharedState } from '../../context/state.context'
import useDebounce from '../../hooks/useDebounce'

import styles from './styles'

const useStyles = makeStyles(styles)

const AddUserModal = ({ open, onClose, t }) => {
  const classes = useStyles()
  const [{ ual }, { showMessage }] = useSharedState()
  const [isValidAccount, setIsValidAccount] = useState(false)
  const [account, setAccount] = useState('')
  const [checked, setCheked] = useState(false)
  const debouncedSearchTerm = useDebounce(account, 200)

  const handleOnChangeAccount = e => {
    setAccount(e.target.value)
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

  const handleOnAdd = async () => {
    try {
      const data = await affiliateUtil.addUser(
        ual.activeUser,
        account,
        checked
          ? affiliateUtil.ROLES_IDS.ADMIN
          : affiliateUtil.ROLES_IDS.REFERRER
      )
      showMessage({
        type: 'success',
        content: (
          <a
            href={`https://testnet.protonscan.io/transaction/${data.transactionId}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${t('success')} ${getLastCharacters(data.transactionId)}`}
          </a>
        )
      })
      setAccount('')
      setCheked(false)
      setIsValidAccount(false)
      onClose()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
  }

  const handleOnClose = () => {
    setAccount('')
    setCheked(false)
    setIsValidAccount(false)
    onClose()
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <Box className={classes.userModal}>
          <Typography className={classes.text}>{t('addUserTitle')}</Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
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

                <Box className={classes.checkBoxReceive}>
                  <Typography className={classes.setAdmin}>
                    {t('switchLabel')}
                  </Typography>
                  <Switch
                    checked={checked}
                    onChange={() => setCheked(!checked)}
                    name="receive"
                    color="primary"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} className={classes.btnAddAccount}>
                <Button onClick={handleOnClose}>{t('cancel')}</Button>
                <Button
                  color="primary"
                  disabled={!isValidAccount}
                  onClick={handleOnAdd}
                >
                  {t('add')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

AddUserModal.propTypes = {
  onClose: PropTypes.func,
  t: PropTypes.func,
  open: PropTypes.bool
}

export default AddUserModal
