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

    default:
      return state
  }
}
