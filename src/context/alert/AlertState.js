import React, { useReducer } from 'react'
import * as types from '../types'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'

const AlertState = ({ children }) => {
  const initialState = null

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  const setAlert = alert =>
    dispatch({
      type: types.SET_ALERT,
      payload: alert,
    })

  const removeAlert = () =>
    dispatch({
      type: types.REMOVE_ALERT,
    })

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
        removeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertState
