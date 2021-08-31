import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
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
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Box>
            {/* <Box className={classes.boxInfo}>
              <Typography className={classes.aboutInfo}>
                {t('body.paragraph1')}
              </Typography>
            </Box> */}

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutTitle}>
                {t('subtitle1')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body1.paragraph1')}
              </Typography>
            </Box>

            <Logo className={classes.logo} />

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutTitle}>
                {t('subtitle2')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body2.paragraph1')}
              </Typography>
            </Box>

            <Box className={classes.boxInfo}>
              <Typography variant="h1" className={classes.aboutTitle}>
                {t('subtitle3')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body3.paragraph1')}
              </Typography>
              <Typography className={classes.aboutInfo}>
                {t('body3.paragraph2')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.boxInfo}>
          <Logo className={classes.logo} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default About
