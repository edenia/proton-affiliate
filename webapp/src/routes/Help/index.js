import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

import styles from './styles'

const useStyles = makeStyles(styles)

const Help = () => {
  const classes = useStyles()
  const { t } = useTranslation('helpRoute')

  return (
    <Box>
      <Typography variant="h3" className={classes.title}>
        {t('title')}
      </Typography>
    </Box>
  )
}

export default Help
