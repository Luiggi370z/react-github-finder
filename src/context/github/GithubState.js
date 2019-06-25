import React, { useReducer } from 'react'
import axios from 'axios'
import * as types from '../types'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'

const apiRoot = 'https://api.github.com'

let githubClientId
let githubClientSecret

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const authParams = `client_id=${githubClientId}&client_secret=${githubClientSecret}`

const GithubState = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  const setLoading = () =>
    dispatch({
      type: types.SET_LOADING,
    })

  const searchUsers = async text => {
    setLoading()

    const res = await axios.get(
      `${apiRoot}/search/users?q=${text}&${authParams}`,
    )

    dispatch({
      type: types.SEARCH_USERS,
      payload: res.data.items,
    })
  }

  const getUser = async username => {
    setLoading()

    const res = await axios.get(`${apiRoot}/users/${username}?${authParams}`)

    dispatch({
      type: types.GET_USER,
      payload: res.data,
    })
  }

  const getUserRepos = async username => {
    setLoading()

    const res = await axios.get(
      `${apiRoot}/users/${username}/repos?per_page=5&sort=created:asc&${authParams}`,
    )

    dispatch({
      type: types.GET_REPOS,
      payload: res.data,
    })
  }

  const clearUsers = () => dispatch({ type: types.CLEAR_USERS })

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubState
