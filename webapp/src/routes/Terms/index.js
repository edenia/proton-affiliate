import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'

import RicardianContract from '../../components/RicardianContract'
import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const Terms = () => {
  const classes = useStyles()

  return (
    <Box className={classes.termsPage}>
      <RicardianContract
        showClauses={false}
        contractName={mainConfig.affiliateAccount}
      />
    </Box>
  )
}

export default Terms
