import userService from '../services/user'

const userReducer = (state=null, action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    case 'CREATE_USER':
      return [...state, action.data]
    case 'DELETE_USER':
      return state.filter(user => user.id !== action.data.id)
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const createUser = ({username, password, name}) => {
  return async dispatch => {
    const newUser = { username, name, password}
    const createdUser = await userService.create(newUser)
    dispatch({
      type: 'CREATE_USER',
      data: createdUser
    })
  }
}

export const selectUserByUsername = (usersState, username) => {
  return usersState.find(user => user.username === username)
}

export default userReducer