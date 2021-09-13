import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import styles from './styles'
import Logo from './logo'

const useStyles = makeStyles(styles)

const About = () => {
  const classes = useStyles()
  const { t } = useTranslation('aboutRoute')

  return (
    <Box className={classes.aboutPage}>
      <Box className={clsx(classes.boxInfo, classes.boxMd)}>
        <Typography variant="h1" className={classes.aboutTitle}>
          {t('subtitle1')}
        </Typography>
        <Typography className={classes.aboutMainInfo}>
          {t('body1.paragraph1')}
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Box>
            <Box className={clsx(classes.boxInfo, classes.boxSm)}>
              <Typography variant="h1" className={classes.aboutTitle}>
                {t('subtitle1')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body1.paragraph1')}
              </Typography>
            </Box>

            <Logo className={classes.logoSm} />

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutSubtitle}>
                {t('subtitle2')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body2.paragraph1')}
              </Typography>
            </Box>

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutSubtitle}>
                {t('subtitle3')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body3.paragraph1')}
              </Typography>
            </Box>

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutSubtitle}>
                {t('subtitle4')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body4.paragraph1')}
              </Typography>
            </Box>

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutSubtitle}>
                {t('subtitle5')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body5.paragraph1')}
              </Typography>
            </Box>

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutSubtitle}>
                {t('subtitle6')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body6.paragraph1')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.boxInfo}>
          <Logo className={classes.logoMd} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default About
