import React, { useState, useEffect } from 'react'
import { likePost, unlikePost, deletePost } from '../../../reducers/postReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../../reducers/loginReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import { openModalReply } from '../../../reducers/modalReducer'
import { triggerNotification } from '../../../reducers/notificationReducer'

const StyledIconsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .iconContainer {
    display: flex;
    align-items: center;
    width: 30px;
  }

  .likeIcon {
    color: ${props => props.liked ? 'rgb(245, 80, 80)' : 'rgb(215, 215, 215)'};
  }

  .iconContainer:hover {
    cursor: pointer;
  }

  .icon {
    padding: 8px;
    border-radius: 50%;
    font-size: 1.5rem;
    transition: background-color .2s, color .2s;
  }

  .likeIconContainer:hover {
    color: rgb(245, 80, 80);

    .likeIcon {
      color: rgb(245, 80, 80);
      background-color: rgba(245, 80, 80, 0.2);
    }
  }

  .replyIconContainer:hover {
    color: rgb(100, 200, 100);

    .replyIcon {
      color: rgb(100, 200, 100);
      background-color: rgba(100, 200, 100, 0.2);
    }
  }

  .deleteIconContainer:hover .deleteIcon {
    background-color: rgba(215, 215, 215, 0.2);
  }

  .iconNum {
    font-size: 1.1rem;
  }
`


const PostIcons = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isUserPost, setIsUserPost] = useState(false)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && post) {
      setIsLiked(user.likedPosts.includes(post.id))
      setIsUserPost(user.id === post.user.id)
    }
  }, [user, post])

  useEffect(() => {
    if (user && post.likedBy.includes(user.id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [post, user])

  const handleErrorAuth = async () => {
    navigate('/')
    await dispatch (logoutUser())
    dispatch(triggerNotification('Session expired: Please log in again', false))
  }

  const handleReply = async (e) => {
    e.stopPropagation()
    await dispatch(openModalReply(post))
  }

  const handleLikeButton = async (e) => {
    e.stopPropagation()
    try {
      if (isLiked) {
        await dispatch(unlikePost(post))
      } else {
        await dispatch(likePost(post))
      }
      setIsLiked(!isLiked)
    } catch (error) {
        handleErrorAuth()
    }
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      navigate('/home')
      await dispatch(deletePost(post.id))
    } catch (error) {
      handleErrorAuth()
    }
    
  }

  return (
    <StyledIconsRow liked={isLiked}>
      <div className="replyIconContainer iconContainer" onClick={handleReply}>
        <FontAwesomeIcon className="replyIcon icon" icon={faComment} size='lg' />
        <span className="iconNum">{post.replies.length > 0 ? post.replies.length : ''}</span>
      </div>
      <div className="likeIconContainer iconContainer" onClick={handleLikeButton}>
        <FontAwesomeIcon className="likeIcon icon" icon={isLiked ? faHeartSolid : faHeartRegular} size='lg' />
        <span className="likeNum iconNum">{post.likes ? post.likes : ''}</span>
      </div>
      <div className="deleteIconContainer iconContainer" onClick={handleDelete}>
      {isUserPost &&
        <FontAwesomeIcon className="deleteIcon icon" icon={faTrashAlt} size='lg' />
      }
      </div>
    </StyledIconsRow>
  )
}

export default PostIcons