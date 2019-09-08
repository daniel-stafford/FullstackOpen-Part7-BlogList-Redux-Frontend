const initialState = { content: '', time: 0, category: 'hide' }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (content, category, time) => {
  console.log('set notification being called', time)
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content,
        category
      }
    })
    setTimeout(() => {
      console.log('remove being called', time * 1000)
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer
