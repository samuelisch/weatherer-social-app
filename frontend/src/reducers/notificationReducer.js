const initialState = {
  text: null,
  error: false
}

const notificationReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'DISPLAY':
      return action.data
    case 'HIDE':
      return action.data
    default:
      return state
  }
}

let timeout

export const triggerNotification = (text, error) => {
  clearTimeout(timeout)
  return dispatch => {
    dispatch({
      type: 'DISPLAY',
      data: { text, error }
    })

    timeout = setTimeout(() => {
      dispatch({
        type: 'HIDE',
        data: null
      })
    }, 3000)
  }
}

export default notificationReducer