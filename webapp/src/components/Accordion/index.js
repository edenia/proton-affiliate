import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
// import FilterListIcon from '@material-ui/icons/FilterList'
// import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  accordion: {
    border: 'none',
    boxShadow: 'none'
  },
  accordionDetails: {
    padding: 0
  },
  color: {
    backgroundColor: 'rgba(245, 247, 250, 0.74)',
    border: 'none',
    boxShadow: 'none',
    height: '64px !important'
  },
  heading: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 21,
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  summary: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

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
            <Typography className={classes.heading}>{title}</Typography>
            {/* {expanded && (
              <IconButton aria-label="delete">
                <FilterListIcon />
              </IconButton>
            )} */}
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
