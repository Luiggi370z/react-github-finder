import React, { useReducer } from 'react'
import axios from 'axios'
import * as types from '../types'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'

const apiRoot = 'https://api.github.com'

const authParams = `client_id=${
  process.env.REACT_APP_GITHUB_CLIENT_ID
}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Set Loading
  const setLoading = () =>
    dispatch({
      type: types.SET_LOADING,
    })

  // Search Users
  const searchUsers = async text => {
    setLoading()

    const res = await axios.get(
      `${apiRoot}/search/users?q=${text}&${authParams}`,
    )

    dispatch({
      type: types.SEARCH_USERS,
      payload: res.data,
    })
  }
  // Get user

  // Get Repos

  // Clear users

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
