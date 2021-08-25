import React, { memo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItem from '@material-ui/core/ListItem'
import Box from '@material-ui/core/Box'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import TelegramIcon from '@material-ui/icons/Telegram'
import YouTubeIcon from '@material-ui/icons/YouTube'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()
  const { t } = useTranslation('footer')

  return (
    <Box className={classes.footer}>
      <Box className={classes.footerWrapper}>
        <Box className={classes.supportWrapper}>
          <Typography className={classes.supportBy}>
            {t('poweredBy')}
          </Typography>
          <Typography className={classes.supportBy}>{t('info')}</Typography>
        </Box>
        <Typography className={clsx(classes.madeBy, classes.madeByMd)}>
          {t('madeBy')}
        </Typography>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <a
                href="https://www.facebook.com/costaricaeos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
            </ListItemIcon>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <a
                href="https://www.youtube.com/c/EOSCostaRica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon />
              </a>
            </ListItemIcon>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <a
                href="https://twitter.com/EOSCostaRica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
            </ListItemIcon>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <a
                href="https://www.linkedin.com/company/eoscostarica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
            </ListItemIcon>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <a
                href="https://github.com/eoscostarica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </a>
            </ListItemIcon>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <a
                href="https://t.me/eoscr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon />
              </a>
            </ListItemIcon>
          </ListItem>
        </List>
        <Typography className={clsx(classes.madeBy, classes.madeBySm)}>
          {t('madeBy')}
        </Typography>
      </Box>
    </Box>
  )
}

export default memo(Footer)
