import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FilterListIcon from '@material-ui/icons/FilterList'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CheckIcon from '@material-ui/icons/Check'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import styles from './styles'

const useStyles = makeStyles(styles)

const AccordionComponent = ({
  children,
  title,
  handleOnFilter,
  filterValues,
  filterRowsBy
}) => {
  const classes = useStyles()
  const { t } = useTranslation('adminRoute')
  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleAccordionExpand = () => {
    setExpanded(!expanded)
  }

  const handleOpenMenu = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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

            {!!filterValues.length && (
              <IconButton onClick={handleOpenMenu}>
                <FilterListIcon />
              </IconButton>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {children}
        </AccordionDetails>
      </Accordion>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={handleClose}
      >
        {(filterValues || []).map(({ label, value }) => {
          return (
            <MenuItem
              key={`${label}-${value}`}
              className={classes.menu}
              onClick={() => {
                handleClose()
                handleOnFilter(value)
              }}
            >
              <Typography className={classes.menuLabel}>{t(label)}</Typography>
              {(value || 0) === filterRowsBy && (
                <ListItemIcon>
                  <CheckIcon className={classes.checkIcon} fontSize="small" />
                </ListItemIcon>
              )}
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}

AccordionComponent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  handleOnFilter: PropTypes.func,
  filterValues: PropTypes.array.isRequired,
  filterRowsBy: PropTypes.number.isRequired
}

AccordionComponent.defaultProps = {
  handleOnFilter: () => {},
  filterValues: [],
  filterRowsBy: 0
}

export default AccordionComponent
