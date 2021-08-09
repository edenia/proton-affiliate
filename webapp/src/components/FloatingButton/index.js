import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'

import styles from './styles'

const useStyles = makeStyles(styles)

const FloatingActionButtons = ({ children, open, setOpen, label }) => {
  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box className={classes.root}>
      <Fab
        variant="extended"
        color="primary"
        className={classes.fab}
        onClick={handleOpen}
      >
        {label}
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          {children}
        </Slide>
      </Modal>
    </Box>
  )
}

FloatingActionButtons.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  label: PropTypes.string
}

export default FloatingActionButtons
