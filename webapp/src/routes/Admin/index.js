import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import styles from './styles'
import AddUserModal from './AddUserModal'

const useStyles = makeStyles(styles)

const Admin = () => {
  const { t } = useTranslation('adminRoute')
  const classes = useStyles()
  const [showModal, setShowModal] = useState(false)

  const handleOnClick = () => {
    setShowModal(true)
  }

  const handleOnClose = () => {
    setShowModal(false)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1">{t('title')}</Typography>
      </Grid>
      <Box className={classes.actionWrapper}>
        <Fab color="primary" onClick={handleOnClick}>
          <AddIcon />
        </Fab>
      </Box>
      {showModal && (
        <AddUserModal open={showModal} onClose={handleOnClose} t={t} />
      )}
    </Grid>
  )
}

export default Admin
