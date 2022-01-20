import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
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

  useEffect(() => {
    if (post) {
      setIsLoaded(true)
    }
  }, [post])

  return (
    <div>
      {isLoaded && 
        <>
          <SinglePost post={post} />
          <hr />
          <PostsList filter={post.id} type="replies" />
        </>
      }
    </div>
  )

}

export default SinglePostPage