import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser } from './reducers/loginReducer';
import LoginForm from './components/home/login/LoginForm';
import PostForm from './components/main/posts/PostForm';
import PostsList from './components/main/posts/PostsList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div className="App">
      <h1>Weatherer</h1>
      {user &&
        <h3>Welcome {user.username}</h3>
      }
      <LoginForm />
      <PostForm />
      <PostsList />
    </div>
  )

}

export default App;
