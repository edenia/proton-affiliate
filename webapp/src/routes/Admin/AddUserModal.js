import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { affiliateUtil, getUALError } from '../../utils'
import { useSharedState } from '../../context/state.context'

import styles from './styles'

const useStyles = makeStyles(styles)

const AddUserModal = ({ open, onClose, t }) => {
  const classes = useStyles()
  const [{ ual }, { showMessage }] = useSharedState()
  const [user, setUser] = useState('')

  const handleOnAdd = async () => {
    try {
      await affiliateUtil.addUser(ual.activeUser, user)
      showMessage({ type: 'success', content: t('success') })
      onClose()
    } catch (error) {
      showMessage({ type: 'error', content: getUALError(error) })
    }
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
        <Box className={classes.paper}>
          <Typography variant="h6">{t('addUserTitle')}</Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="account"
                  label={t('account')}
                  variant="outlined"
                  value={user}
                  onChange={event => setUser(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
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
