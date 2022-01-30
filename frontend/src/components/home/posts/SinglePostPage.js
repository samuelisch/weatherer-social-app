import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPostFromId } from '../../../reducers/postReducer'
import SinglePost from './SinglePost'
import PostsList from './PostsList'
import ReplyTo from './ReplyTo'

const StyledPostContainer = styled.div`
  padding: 10px;
    border: 1px solid rgb(85, 85, 85);
    border-width: 0 1px 1px;
`

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .backIcon {
    padding: 7px;
    font-size: 1.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      cursor: pointer;
      background-color: rgba(215, 215, 215, 0.2);
    }
  }

  .description {
    margin: 0 15px;
    font-weight: bold;
    font-size: 1.8rem;
  }
`

const SinglePostPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [postParent, setPostParent] = useState(null)
  const navigate = useNavigate()
  const params = useParams()
  const { postId } = params
  const post = useSelector(state => getPostFromId(state.posts, postId))
  const user = useSelector(state => state.login)

  useEffect(() => {
    if (post && user) {
      setIsLoaded(true)
    } else {
      setIsLoaded(false)
    }
  }, [post, user])

  return (
    <div>
      {isLoaded && 
        <>
          <StyledPostContainer>
            <StyledInfo>
              <FontAwesomeIcon className="backIcon" icon={faArrowLeft} onClick={() => navigate(-1)} />
              <span className="description">Thread</span>
            </StyledInfo>
            {post.replyToPost &&
              <ReplyTo postId={post.replyToPost} />
            }
            <SinglePost 
              post={post} 
              user={user}
            />
          </StyledPostContainer>
          <PostsList filterKey={post.id} type="replies" />
        </>
      }
    </div>
  )

}

export default SinglePostPage