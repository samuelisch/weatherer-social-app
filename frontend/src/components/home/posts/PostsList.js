import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Post from './Post'
import { useSelector } from 'react-redux'

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const StyledPostContainer = styled.div`
  border: 1px solid rgb(85, 85, 85);
  border-width: 0 1px 1px;
  padding: 10px 15px 5px;
`

const PostsList = ({ filterKey, type }) => {
  const [filteredPosts, setFilteredPosts] = useState([])
  const posts = useSelector(state => state.posts)

  useEffect(() => {
    if (type === 'userId') {
      setFilteredPosts(posts.filter(post => post.user.id === filterKey))
    } else if (type === 'replies') {
      const replyIds = posts.find(post => post.id === filterKey).replies
      setFilteredPosts(posts.filter(post => replyIds.includes(post.id)))
    } else if (type === 'search') {
      setFilteredPosts(posts.filter(post => post.content.includes(filterKey)))
    } else {
      setFilteredPosts(posts.filter(post => !post.replyToPost))
    }
  }, [type, posts, filterKey])

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = filteredPosts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const postsToRender = orderedPosts.map(post => {
    return (
      <StyledPostContainer key={post.id}>
        <Post 
          post={post}
        />
      </StyledPostContainer>
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