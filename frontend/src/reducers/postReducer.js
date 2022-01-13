import postService from '../services/post'

const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_POSTS':
      return action.data
    case 'NEW_POST':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializePosts = () => {
  return async dispatch => {
    const posts = await postService.getAll()
    dispatch({
      type:'INIT_POSTS',
      data: posts,
    })
  }
}

export const createPost = (content) => {
  return async dispatch => {
    const newPost = await postService.create(content)
    dispatch({
      type: 'NEW_POST',
      data: newPost,
    })
  }
}

export default postReducer