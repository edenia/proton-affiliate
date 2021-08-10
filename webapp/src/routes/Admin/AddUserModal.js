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

import { affiliateUtil } from '../../utils'
import useDebounce from '../../hooks/useDebounce'

import styles from './styles'

const useStyles = makeStyles(styles)

const AddUserModal = ({ open, onClose, onSubmit, t }) => {
  const classes = useStyles()
  const [isValidAccount, setIsValidAccount] = useState({
    showHelper: false,
    message: '',
    isValid: false
  })
  const [account, setAccount] = useState('')
  const [checked, setCheked] = useState(false)
  const debouncedAccount = useDebounce(account, 200)

  const handleOnChangeAccount = e => {
    setAccount(e.target.value)
  }

  useEffect(() => {
    const validateAccount = async () => {
      const isValid = await affiliateUtil.isAccountValidAsInvitee(
        debouncedAccount
      )

      setIsValidAccount({
        showHelper: true,
        isValid: !isValid,
        message: t(!isValid ? 'accountHelperText' : 'accountHelperError')
      })
    }

    if (debouncedAccount) {
      validateAccount()
    } else {
      setIsValidAccount({
        showHelper: false,
        message: '',
        isValid: false
      })
    }
  }, [debouncedAccount])

  useEffect(() => {
    setAccount('')
    setCheked(false)
    setIsValidAccount(false)
  }, [open])

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
                <Button onClick={onClose}>{t('cancel')}</Button>
                <Button
                  color="primary"
                  disabled={!isValidAccount.isValid}
                  onClick={() =>
                    onSubmit({
                      account,
                      isAdmin: checked
                    })
                  }
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
  onSubmit: PropTypes.func,
  t: PropTypes.func,
  open: PropTypes.bool
}

export default AddUserModal
