import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import postReducer from './reducers/postReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  posts: postReducer,
  login: loginReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store