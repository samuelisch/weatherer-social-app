import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Post from './Post'
import { useSelector } from 'react-redux'

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const PostsList = ({ filter, type }) => {
  const [filteredPosts, setFilteredPosts] = useState([])
  const posts = useSelector(state => state.posts)
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (type === 'userId') {
      setFilteredPosts(posts.filter(post => post.user.id === filter))
    } else if (type === 'replies') {
      const replyIds = posts.find(post => post.id === filter).replies
      setFilteredPosts(posts.filter(post => replyIds.includes(post.id)))
    } else {
      setFilteredPosts(posts.filter(post => !post.replyToPost))
    }
  }, [type, posts, filter])

  const postsToRender = filteredPosts.map(post => {
    return (
      <Post 
        key={post.id}
        post={post}
        user={user}
      />
    )
  })

  return (
    <div>
      <StyledList>
        {postsToRender}
      </StyledList>
    </div>
  )
}

export default PostsList