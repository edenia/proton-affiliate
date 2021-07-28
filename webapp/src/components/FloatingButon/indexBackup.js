import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  floatingMenu: {
    position: 'absolute',
    right: 8,
    bottom: 32,
    height: 42,
    textAlign: 'right',
    border: '1px solid red'
    // transition: 'height 250ms ease-in-out'
  },

  open: {
    height: 'auto', // 153,
    overflow: 'hidden',

    '& label': {
      opacity: '0.4'
    }
  },
  floatingMenuItem: {
    // marginTop: 8,
    '& label': {
      display: 'inline-block',
      marginRight: 8,
      padding: '4px 10px',
      borderRadius: 12,
      background: 'rgba(0,0,0,.25)',
      opacity: 0,
      transition: 'opacity 250ms ease-in-out'
    }
  },
  floatingMenuIcon: {
    display: 'inline-block',
    width: 42,
    height: 42,
    lineHeight: '42px',
    verticalAlign: 'middle',
    background: '#e53935',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,.2)',
    textAlign: 'center'
  },
  materialIcons: {
    fontSize: 14,
    color: '#fff',
    verticalAlign: 'middle'
  }
}))

const FloatingMenuItem = ({ label, icon, action }) => {
  const classes = useStyles()

  return (
    <div onClick={action} className={classes.floatingMenuItem}>
      {label}
      <div className={classes.floatingMenuIcon}>
        <i className={classes.materialIcons}>{icon}</i>
      </div>
    </div>
  )
}

FloatingMenuItem.propTypes = {
  icon: PropTypes.any,
  label: PropTypes.any,
  action: PropTypes.any
}

const FloatingMenu = () => {
  const classes = useStyles()

  const [toggled, setToggled] = useState(false)
  const buttons = []
  let icon = 'add'

  const toggleMenu = () => {
    setToggled(!toggled)
  }

  if (toggled) {
    icon = 'clear'
    buttons.push(
      <FloatingMenuItem
        label="ADD ACCOUNT"
        icon="create"
        action={() => console.log('tomela 1')}
        key="i1"
      />
    )
    buttons.push(
      <FloatingMenuItem
        label="APPROVE ACCOUNT"
        icon="drafts"
        action={() => console.log('tomela 2')}
        key="i2"
      />
    )

    buttons.push(
      <FloatingMenuItem
        label="REJECT ACCOUNT"
        icon="drafts"
        action={() => console.log('tomela 3')}
        key="i3"
      />
    )

    buttons.push(
      <FloatingMenuItem
        label="REMOVE LISTENING"
        icon="drafts"
        action={() => console.log('tomela 4')}
        key="i4"
      />
    )
  }

  buttons.push(
    <FloatingMenuItem label="" icon={icon} action={toggleMenu} key="m" />
  )

  return (
    <div className={clsx(classes.floatingMenu, { [classes.open]: toggled })}>
      {buttons}
    </div>
  )
}

export default FloatingMenu
