import { createStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import postReducer from './reducers/postReducer'

const reducer = combineReducers({
  posts: postReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store