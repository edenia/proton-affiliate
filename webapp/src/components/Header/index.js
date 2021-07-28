import React, { memo, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation, useHistory } from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import LanguageIcon from '@material-ui/icons/Language'
import AccountIcon from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import CloseIcon from '@material-ui/icons/Close'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { Sun as SunIcon, Moon as MoonIcon } from 'react-feather'

import { useSharedState } from '../../context/state.context'
import { mainConfig } from '../../config'
import PageTitle from '../PageTitle'
import { ProtonLogo } from '../SvgIcons'

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
  const { t } = useTranslation()

  return (
    <Button startIcon={<CloseIcon />} onClick={onSignOut}>
      {t('signOut')}
    </Button>
  )
})

AuthButton.displayName = 'AuthButton'

AuthButton.propTypes = {
  onSignOut: PropTypes.func
}

const Header = memo(({ onDrawerToggle, useSecondaryHeader = false }) => {
  const classes = useStyles()
  const { t } = useTranslation('routes')
  const history = useHistory()
  const location = useLocation()
  const [state, { setState, login, logout }] = useSharedState()
  const { i18n } = useTranslation('translations')
  const [currentLanguaje, setCurrentLanguaje] = useState()
  const [menuAnchorEl, setMenuAnchorEl] = useState()

  const handleSwitchThemeMode = useDarkMode => {
    setState({ useDarkMode })
  }

  const handleChangeLanguage = languaje => i18n.changeLanguage(languaje)

  const handleLogin = () => {
    login()
    history.push('/affiliate')
  }

  const handleSignOut = () => {
    logout()
    history.push('/')
  }

  const handleSwitchRoute = path => {
    history.push(path)
  }

  const handleOpenMenu = event => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null)
  }

  useEffect(() => {
    setCurrentLanguaje(i18n.language?.substring(0, 2) || 'en')
  }, [i18n.language])

  if (useSecondaryHeader) {
    return (
      <AppBar className={classes.secondayAppBar} position="sticky">
        <IconButton aria-label="Back" onClick={() => console.log('back')}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography className={classes.secondayTitle}>
          Aliceblack by bobwhite
        </Typography>
      </AppBar>
    )
  }

  return (
    <AppBar className={classes.appBar} position="sticky">
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton aria-label="Open drawer" onClick={onDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <ProtonLogo />
        <PageTitle title={t(`${location.pathname}>title`, mainConfig.title)} />
        <Box className={classes.desktopSection}>
          <SwitchThemeModeButton
            useDarkMode={state.useDarkMode}
            onSwitch={handleSwitchThemeMode}
          />
          <LanguageButton
            current={currentLanguaje}
            onChange={handleChangeLanguage}
          />
          <UserButton user={state.user} />
          <AuthButton
            user={state.user}
            onLogin={handleLogin}
            onSignOut={handleSignOut}
          />
        </Box>
        <Box className={classes.mobileSection}>
          {state.user ? (
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <AccountIcon />
            </IconButton>
          ) : (
            <Button onClick={handleLogin}>{t('login')}</Button>
          )}
        </Box>
      </Toolbar>
      <Menu
        anchorEl={menuAnchorEl}
        open={!!menuAnchorEl}
        onClose={handleCloseMenu}
      >
        <MenuItem>
          <Button
            startIcon={<EditIcon />}
            onClick={() => handleSwitchRoute('/admin')}
          >
            Admin
          </Button>
        </MenuItem>
        <MenuItem>
          <Button startIcon={<RotateRightIcon />}>Switch User</Button>
        </MenuItem>
        <Divider />
        <MenuItem>
          <AuthButton onSignOut={handleSignOut} />
        </MenuItem>
      </Menu>
    </AppBar>
  )
})

Header.displayName = 'Header'

Header.propTypes = {
  onDrawerToggle: PropTypes.func,
  useSecondaryHeader: PropTypes.bool
}

export default Header
