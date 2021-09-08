import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TelegramIcon from '@material-ui/icons/Telegram'
import GitHubIcon from '@material-ui/icons/GitHub'
import Link from '@material-ui/core/Link'

import ProtonIcon from './ProtonIcon'
import styles from './styles'

const useStyles = makeStyles(styles)

const Help = () => {
  const classes = useStyles()
  const { t } = useTranslation('helpRoute')

  return (
    <Box className={classes.helpPage}>
      <Grid container direction="column">
        <Grid item xs>
          <Grid container direction="column">
            <Typography variant="h1" className={classes.helpTitle}>
              {t('title')}
            </Typography>
            <Typography className={classes.helpInfo}>
              {t('paragraph')}
            </Typography>

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.helpSubtitle}>
                {t('subtitle1')}
              </Typography>
              <Typography className={classes.helpSubinfo}>
                {t('info1')}
              </Typography>
              <Box className={classes.iconBox}>
                <GitHubIcon className={classes.svgIcon} />
                <Link
                  href="https://github.com/eoscostarica/proton-affiliate/issues/new/choose"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.links}
                >
                  <Typography className={classes.textUpper}>
                    {t('text1')}
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.helpSubtitle}>
                {t('subtitle2')}
              </Typography>
              <Typography className={classes.helpSubinfo}>
                {t('info2')}
              </Typography>
              <Box className={classes.iconBox}>
                <TelegramIcon className={classes.svgIcon} />
                <Link
                  href="https://t.me/protonxpr"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.links}
                >
                  <Typography className={classes.textUpper}>
                    {t('text2')}
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.helpSubtitle}>
                {t('subtitle3')}
              </Typography>
              <Typography className={classes.helpSubinfo}>
                {t('info3')}
              </Typography>
              <Box className={classes.iconBox}>
                <ProtonIcon className={classes.protonIcon} />
                <Link
                  href="https://www.protonchain.com"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.links}
                >
                  <Typography className={classes.textUpper}>
                    {t('text3')}
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Help
