import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import CustomizedTimeline from '../Timeline'
import Modal from '../Modal'
import styles from './styles'

const useStyles = makeStyles(styles)

const HistoryModal = ({ open, onClose, children, referral, title }) => {
  const classes = useStyles()

  return (
    <Modal open={open} setOpen={onClose}>
      <Box className={classes.timeline}>
        <Box className={classes.secondayBar} position="sticky">
          <IconButton aria-label="Back" onClick={onClose}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography className={classes.secondayTitle}>
            {referral?.invitee} by {referral?.referrer}
          </Typography>
        </Box>
        <Box className={classes.bodySecondary}>
          <Box>
            <Typography className={classes.timelineTitle}>{title}</Typography>
            <CustomizedTimeline items={referral?.history} />
            <Box className={classes.modalFooter}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

HistoryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  referral: PropTypes.any
}

export default HistoryModal
