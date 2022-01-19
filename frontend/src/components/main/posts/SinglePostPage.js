import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SinglePostPage = () => {
  const params = useParams()

  return (
    <div>
      <p>Content: </p>
      <p>Likes: </p>
      <p>by: </p>
    </div>
  )

}

export default SinglePostPage