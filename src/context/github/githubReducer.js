import * as types from '../types'

export default (state, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      }

    case types.SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }

    case types.CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      }

    case types.GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }

    case types.GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      }

    default:
      return state
  }
}
