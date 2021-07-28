import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fabBox: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(2)
  },
  wrapperAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2)
  },
  actionLabel: {
    flexGrow: 0,
    margin: '12px 16px 12px 0',
    fontSize: 14,
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.14',
    letterSpacing: '1px',
    textAlign: 'right',
    color: '#fff',
    textTransform: 'uppercase'
  }
}))

const FloatingActionButtons = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

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
        ACTIONS
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box className={classes.fabBox}>
            <Box className={classes.wrapperAction}>
              <Typography className={classes.actionLabel}>
                Add Account
              </Typography>
              <Fab size="small" color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Box>
            <Box className={classes.wrapperAction}>
              <Typography className={classes.actionLabel}>
                Approve Account
              </Typography>
              <Fab size="small" color="primary" aria-label="edit">
                <CheckIcon />
              </Fab>
            </Box>
            <Box className={classes.wrapperAction}>
              <Typography className={classes.actionLabel}>
                Reject Account
              </Typography>
              <Fab size="small" color="primary" aria-label="add">
                <CloseIcon />
              </Fab>
            </Box>
            <Box className={classes.wrapperAction}>
              <Typography className={classes.actionLabel}>
                Remove Listing
              </Typography>
              <Fab size="small" color="primary" aria-label="edit">
                <DeleteIcon />
              </Fab>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </Box>
  )
}

export default FloatingActionButtons
