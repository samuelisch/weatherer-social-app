import loginService from '../services/login'
import postService from '../services/post'
import userService from '../services/user'

const loginReducer = (state=null, action) => {
  switch(action.type) {
    case 'LOGIN_INIT':
      return action.data
    case 'USER_LOGIN':
      return action.data
    case 'USER_LOGOUT':
      return null
    default:
      return state
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    let userCredentials = JSON.parse(window.localStorage.getItem('loggedAppUser'))
    if (userCredentials) {
      postService.setToken(userCredentials.token)
      const user = await userService.getOne(userCredentials.id)
      dispatch({
        type: 'LOGIN_INIT',
        data: user
      })
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      let userResponse = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(userResponse)
      )
      postService.setToken(userResponse.token)
      const user = await userService.getOne(userResponse.id)
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
    dispatch({
      type: 'USER_LOGOUT'
    })
  }
}

export default loginReducer