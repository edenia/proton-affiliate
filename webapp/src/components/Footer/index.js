import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()

  if (!mainConfig.footerLinks?.length) {
    return <></>
  }

  return (
    <Box className={classes.root}>
      <Grid container item xs={12}>
        <List>
          {mainConfig.footerLinks.map((link, index) => (
            <ListItem className={classes.listItem} key={index}>
              <ListItemText
                primary={
                  <a href={link.src} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Box>
  )
}

export default memo(Footer)
