import postService from '../services/post'

const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_POSTS':
      return action.data
    case 'NEW_POST':
      return [...state, action.data]
    case 'LIKE_POST':
      return state.map(
        post => post.id === action.data.id 
          ? action.data 
          : post
      )
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.data.id)
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

export const likePost = (post) => {
  return async dispatch => {
    const newPost = { ...post, likes: post.likes + 1}
    const returnedPost = await postService.update(post.id, newPost, 'like')
    dispatch({
      type: 'LIKE_POST',
      data: returnedPost
    })
  }
}

export const unlikePost = (post) => {
  return async dispatch => {
    const newPost = { ...post, likes: post.likes - 1}
    const returnedPost = await postService.update(post.id, newPost, 'unlike')
    dispatch({
      type: 'LIKE_POST',
      data: returnedPost
    })
  }
}

export const deletePost = (id) => {
  return async dispatch => {
    await postService.remove(id)
    dispatch({
      type: 'DELETE_POST',
      data: { id }
    })
  }
}

export default postReducer