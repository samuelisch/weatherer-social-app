import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPostFromId } from '../../../reducers/postReducer'
import SinglePost from './SinglePost'
import PostsList from './PostsList'

const SinglePostPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const params = useParams()
  const { postId } = params
  const post = useSelector(state => getPostFromId(state.posts, postId))
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (post && user) {
      setIsLoaded(true)
    }
  }, [post, user])

  return (
    <div>
      {isLoaded && 
        <>
          <SinglePost 
            post={post} 
            user={user}
          />
          <PostsList filter={post.id} type="replies" />
        </>
      }
    </div>
  )

}

export default SinglePostPage