import blogService from '../services/blogs'

const initialState = null

export const addUser = user => {
  return async dispatch => {
    try {
      dispatch({
        type: 'ADD_USER',
        data: { ...user }
      })
    } catch (error) {
      console.log(error)
    }
    await blogService.setToken(user.token)
  }
}

export const removeUser = () => {
  window.localStorage.clear()
  console.log('window cleared??')
  return {
    type: 'REMOVE_USER'
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.data
    case 'REMOVE_USER':
      return initialState
    default:
      return state
  }
}

export default userReducer
