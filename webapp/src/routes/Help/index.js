import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import HttpIcon from '@material-ui/icons/Http'
import TelegramIcon from '@material-ui/icons/Telegram'
import GitHubIcon from '@material-ui/icons/GitHub'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import styles from './styles'

const useStyles = makeStyles(styles)

const Help = () => {
  const classes = useStyles()
  const { t } = useTranslation('helpRoute')

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item xs>
              <Grid container direction="column">
                <Typography variant="h4" className={classes.title}>
                  {t('title')}
                </Typography>
                <Typography variant="body2" align="justify" paragraph>
                  {t('paragraph')}
                </Typography>

                <Box className={classes.boxLinks}>
                  <GitHubIcon />
                  <Link
                    href="https://github.com/eoscostarica/proton-affiliate"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography variant="body1">{t('protonGitHub')}</Typography>
                  </Link>
                </Box>
                <Box className={classes.boxLinks}>
                  <TelegramIcon />
                  <Link
                    href="https://t.me/protonxpr"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography variant="body1">
                      {t('telegramChannel')}
                    </Typography>
                  </Link>
                </Box>
                <Box className={classes.boxLinks}>
                  <HttpIcon />
                  <Link
                    href="https://www.protonchain.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Typography variant="body1">
                      {t('protonWebsite')}
                    </Typography>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Help
