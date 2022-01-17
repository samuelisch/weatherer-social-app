import loginService from '../services/login'
import postService from '../services/post'

const loginReducer = (state=null, action) => {
  switch(action.type) {
    case 'USER_INIT':
      return action.data
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  return dispatch => {
    let user = JSON.parse(window.localStorage.getItem('loggedAppUser'))
    if (user) {
      console.log('already logged in')
      postService.setToken(user.token)
      dispatch({
        type: 'USER_INIT',
        data: user
      })
    } else {
      console.log('not logged in')
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      let user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      postService.setToken(user.token)
      console.log('logged in')
      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
    } catch (error) {
      console.log('wrong username or password', error)
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedAppUser')
    console.log('logged out')
    dispatch({
      type: 'USER_LOGOUT'
    })
  }
}

export default loginReducer