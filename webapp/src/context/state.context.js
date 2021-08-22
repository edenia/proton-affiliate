import React, { createContext, useReducer, useMemo, useContext } from 'react'
import { ConnectWallet } from '@proton/web-sdk'
import PropTypes from 'prop-types'

import { sdkConfig } from '../config'
import { affiliateUtil } from '../utils'

const SharedStateContext = createContext()
const initialValue = {
  useDarkMode: false,
  user: null
}

const loginWallet = async (restoreSession = false) => {
  try {
    const { link, session } = await ConnectWallet({
      linkOptions: {
        endpoints: sdkConfig.endpoint,
        restoreSession
      },
      transportOptions: {
        requestStatus: true
      },
      selectorOptions: {
        appName: sdkConfig.appName,
        appLogo: sdkConfig.appLogo,
        customStyleOptions: sdkConfig.customStyleOptions
      }
    })

    return { link, session }
  } catch (error) {
    throw new Error(`Error on init login wallet: ${error}`)
  }
}

const sharedStateReducer = (state, action) => {
  switch (action.type) {
    case 'userChange':
      return {
        ...state,
        user: action.user
      }

    case 'set': {
      return {
        ...state,
        ...action.payload
      }
    }

    case 'showMessage':
      return {
        ...state,
        message: action.payload
      }

    case 'hideMessage':
      return {
        ...state,
        message: null
      }

    case 'login':
      return { ...state, user: action.payload }

    case 'logout':
      return { ...state, user: null }

    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

export const SharedStateProvider = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(sharedStateReducer, {
    ...initialValue
  })
  const value = useMemo(() => [state, dispatch], [state])

  return (
    <SharedStateContext.Provider value={value} {...props}>
      {children}
    </SharedStateContext.Provider>
  )
}

SharedStateProvider.propTypes = {
  children: PropTypes.node
}

export const useSharedState = () => {
  const context = useContext(SharedStateContext)

  if (!context) {
    throw new Error(`useSharedState must be used within a SharedStateContext`)
  }

  const [state, dispatch] = context
  const setState = payload => dispatch({ type: 'set', payload })
  const showMessage = payload => dispatch({ type: 'showMessage', payload })
  const hideMessage = () => dispatch({ type: 'hideMessage' })
  const login = async () => {
    try {
      const { link, session } = await loginWallet(false)
      const role = await affiliateUtil.getUserRole(session?.auth?.actor)

      dispatch({
        type: 'login',
        payload: {
          link,
          session,
          role,
          accountName: session?.auth?.actor || ''
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  const logout = async () => {
    try {
      const { link, session } = await loginWallet(true)

      await link.removeSession(sdkConfig.appName, session.auth)
      dispatch({ type: 'logout' })
    } catch (error) {
      console.error(error)
    }
  }

  return [state, { setState, showMessage, hideMessage, login, logout }]
}
