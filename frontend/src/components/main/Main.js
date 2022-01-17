import React from 'react'
import PostForm from './posts/PostForm'
import PostsList from './posts/PostsList'
import { useSelector } from 'react-redux'

const Main = () => {
  const user = useSelector(state => state.login)

  return (
    <div className="main">
      {user && 
        <h3>Welcome {user.username}</h3>
      }
      <PostForm />
      <PostsList />
    </div>
  )
}

export default Main