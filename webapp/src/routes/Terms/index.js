import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import { RicardianContract as RicardianContractComponent } from '@eoscostarica/eoscr-components'

import styles from './styles'

const useStyles = makeStyles(styles)

const Terms = () => {
  const classes = useStyles()
  const { t } = useTranslation('termsRoute')
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h3" className={classes.title}>
            {t('title')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
    // <RicardianContract
    //   httpEndpoint={httpEndpoint}
    //   contractName={contractName}
    //   actionName={actionName}
    //   showClauses={showClauses}
    //   url={config.eosApiHost}
    //   title={title}
    // />
  )
}

export default Terms
