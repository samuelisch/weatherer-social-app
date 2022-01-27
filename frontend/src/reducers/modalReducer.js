const modalReducer = (state=null, action) => {
  switch(action.type) {
    case 'OPEN_MODAL':
      return action.data
    case 'CLOSE_MODAL':
      return action.data
    default:
      return state
  }
}

export const openModal = (post) => {
  return dispatch => {
    dispatch({
      type: 'OPEN_MODAL',
      data: post
    })
  }
}

export const closeModal = () => {
  return dispatch => {
    dispatch({
      type: 'CLOSE_MODAL',
      data: null
    })
  }
}

export default modalReducer