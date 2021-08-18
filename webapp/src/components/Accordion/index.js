import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import styles from './styles'

const useStyles = makeStyles(styles)

const AccordionComponent = ({ children, title }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleAccordionExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <Box className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          className={classes.color}
          onClick={handleAccordionExpand}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box className={classes.summary}>
            <Typography variant="h1" className={classes.heading}>
              {title}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

AccordionComponent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default AccordionComponent
