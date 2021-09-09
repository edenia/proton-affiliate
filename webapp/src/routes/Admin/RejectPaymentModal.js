import React, { useState, useEffect } from 'react'
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

import styles from './styles'

const useStyles = makeStyles(styles)

const RejectPaymentModal = ({ open, onClose, onSubmit, t }) => {
  const classes = useStyles()
  const [memo, setMemo] = useState('')

  const handleOnChangeMemo = e => {
    setMemo(e.target.value)
  }

  useEffect(() => {
    setMemo('')
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
          <Typography className={classes.text}>
            {t('rejectPaymentModal')}
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  onChange={handleOnChangeMemo}
                  value={memo}
                  id="filled-memo"
                  label={t('rejectMemo')}
                  variant="filled"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} className={classes.btnAddAccount}>
                <Button onClick={onClose}>{t('cancel')}</Button>
                <Button color="primary" onClick={() => onSubmit(memo)}>
                  {t('ok')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  )
}

RejectPaymentModal.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
  open: PropTypes.bool
}

export default RejectPaymentModal
