import React, { memo, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  useLocation,
  useHistory,
  NavLink as RouterNavLink
} from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import Link from '@material-ui/core/Link'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LanguageIcon from '@material-ui/icons/Language'
import AccountIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather'

import { useSharedState } from '../../context/state.context'
import { mainConfig } from '../../config'
import PageTitle from '../PageTitle'
import {
  ProtonLogo,
  ProtonLogoDesktop,
  ProtonLogoTestnet,
  ProtonLogoDesktopTestnet
} from '../SvgIcons'

import styles from './styles'

const useStyles = makeStyles(styles)

const SwitchThemeModeButton = memo(({ useDarkMode, onSwitch }) => {
  const { t } = useTranslation('header')

  return (
    <Button
      startIcon={useDarkMode ? <SunIcon /> : <MoonIcon />}
      onClick={() => onSwitch(!useDarkMode)}
    >
      {t(useDarkMode ? 'lightMode' : 'darkMode')}
    </Button>
  )
})

SwitchThemeModeButton.displayName = 'SwitchThemeModeButton'

SwitchThemeModeButton.propTypes = {
  useDarkMode: PropTypes.bool,
  onSwitch: PropTypes.func
}

const LanguageButton = memo(({ current, onChange }) => {
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null)
  const languages = [
    {
      value: 'en',
      label: 'EN'
    },
    {
      value: 'es',
      label: 'ES'
    }
  ]

  const handleLanguajeMenuOpen = event => {
    setLanguageAnchorEl(event.currentTarget)
  }

  const handleLanguajeMenuClose = language => {
    setLanguageAnchorEl(null)
    typeof language === 'string' && onChange && onChange(language)
  }

  return (
    <>
      <Button startIcon={<LanguageIcon />} onClick={handleLanguajeMenuOpen}>
        {(current || '').toUpperCase()}
      </Button>
      <Menu
        keepMounted
        anchorEl={languageAnchorEl}
        open={!!languageAnchorEl}
        onClose={handleLanguajeMenuClose}
      >
        {languages.map(language => (
          <MenuItem
            key={`language-menu-${language.value}`}
            onClick={() => handleLanguajeMenuClose(language.value)}
          >
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})

LanguageButton.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func
}

const UserButton = memo(({ user }) => (
  <>{user && <Button startIcon={<AccountIcon />}>{user.accountName}</Button>}</>
))

UserButton.displayName = 'UserButton'

UserButton.propTypes = {
  user: PropTypes.any
}

const AuthButton = memo(({ onSignOut }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Button
      startIcon={<CloseIcon />}
      onClick={onSignOut}
      className={classes.noHover}
    >
      {t('signOut')}
    </Button>
  )
})

AuthButton.displayName = 'AuthButton'

AuthButton.propTypes = {
  onSignOut: PropTypes.func
}

const ListItemLink = ({ name, path, badge, ...props }) => {
  const classes = useStyles()
  const { t } = useTranslation('routes')
  const primaryText = path.includes('http')
    ? t(name, name)
    : t(`${path}>sidebar`, path)

  return (
    <MuiListItem
      button
      component={NavLink}
      exact
      to={path}
      activeClassName="active"
      href={path}
      {...props}
      className={classes.btnHeader}
    >
      <ListItemText primary={primaryText} />
    </MuiListItem>
  )
}

ListItemLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  badge: PropTypes.string
}

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

NavLink.displayName = 'NavLink'

const Header = memo(({ onDrawerToggle, routes }) => {
  const classes = useStyles()
  const { t } = useTranslation('routes')
  const history = useHistory()
  const location = useLocation()
  const [state, { login, logout }] = useSharedState()
  const [menuAnchorEl, setMenuAnchorEl] = useState()

  const handleLogin = () => {
    login()
  }

  const handleSignOut = () => {
    logout()
    history.push('/')
    setMenuAnchorEl(null)
  }

  const handleSwitchRoute = path => {
    history.push(path)
    setMenuAnchorEl(null)
  }

  const handleOpenMenu = event => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  const getMenuItem = () => {
    if (state.user.role !== 'ADMIN')
      return (
        <Menu
          anchorEl={menuAnchorEl}
          open={!!menuAnchorEl}
          onClose={handleCloseMenu}
        >
          <MenuItem className={classes.accountNameInfo}>
            <Box>
              <AccountIcon />
              <Typography>{state.user.accountName}</Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <AuthButton onSignOut={handleSignOut} />
          </MenuItem>
        </Menu>
      )

    return (
      <Menu
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem className={classes.accountNameInfo}>
          <Box>
            <AccountIcon />
            <Typography>{state.user.accountName}</Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Button
            startIcon={<EditIcon />}
            onClick={() => handleSwitchRoute('/admin')}
            className={classes.noHover}
          >
            Admin
          </Button>
        </MenuItem>
        <Divider />
        <MenuItem>
          <AuthButton onSignOut={handleSignOut} />
        </MenuItem>
      </Menu>
    )
  }

  return (
    <AppBar className={classes.appBar} position="sticky">
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton aria-label="Open drawer" onClick={onDrawerToggle}>
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
        </Hidden>
        <Link
          button
          component={NavLink}
          exact
          to="/"
          activeClassName="active"
          href="/"
        >
          {mainConfig.isTestnet ? (
            <ProtonLogoTestnet className={classes.imageSm} />
          ) : (
            <ProtonLogo className={classes.imageSm} />
          )}
          {mainConfig.isTestnet ? (
            <ProtonLogoDesktopTestnet className={classes.imageMd} />
          ) : (
            <ProtonLogoDesktop className={classes.imageMd} />
          )}
        </Link>
        <PageTitle title={t(`${location.pathname}>title`, mainConfig.title)} />
        <Box className={classes.desktopSection}>
          <List component="nav" className={classes.navBar}>
            {routes.map((route, index) => (
              <ListItemLink
                key={`${route.name}${index}`}
                name={route.name}
                path={route.path}
                badge={route.badge}
              />
            ))}
          </List>
          {state.user ? (
            <Button
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleOpenMenu}
              className={classes.iconButton}
              startIcon={<AccountIcon />}
            >
              <Typography>{state.user.accountName}</Typography>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.btnLogin}
              onClick={handleLogin}
            >
              {t('login')}
            </Button>
          )}
        </Box>
        <Box className={classes.mobileSection}>
          {state.user ? (
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              className={classes.iconButton}
              onClick={handleOpenMenu}
            >
              <AccountIcon />
            </IconButton>
          ) : (
            <Button onClick={handleLogin}>{t('login')}</Button>
          )}
        </Box>
      </Toolbar>

      {state.user && getMenuItem()}
    </AppBar>
  )
})

Header.displayName = 'Header'

Header.propTypes = {
  onDrawerToggle: PropTypes.func,
  routes: PropTypes.array
}

export default Header
