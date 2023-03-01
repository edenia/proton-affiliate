import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import { RicardianContract } from '@eoscostarica/eoscr-components'

import { mainConfig, sdkConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const Terms = () => {
  const classes = useStyles()

  return (
    <Box className={classes.termsPage}>
      <RicardianContract
        contractName={mainConfig.affiliateAccount}
        httpEndpoint={sdkConfig.endpoint}
        url={mainConfig.blockExplorer}
      />
    </Box>
  )
}

export default Terms
