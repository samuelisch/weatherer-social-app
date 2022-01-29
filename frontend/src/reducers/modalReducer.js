const modalReducer = (state=null, action) => {
  switch(action.type) {
    case 'OPEN_MODAL':
      return action.data
    case 'MODAL_REPLY':
      return action.data
    case 'CLOSE_MODAL':
      return action.data
    default:
      return state
  }
}

export const openModal = (type) => {
  return dispatch => {
    dispatch({
      type: 'OPEN_MODAL',
      data: { type }
    })
  }
}

export const openModalReply = (post) => {
  return dispatch => {
    dispatch({
      type: 'MODAL_REPLY',
      data: { post, type: "reply"}
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