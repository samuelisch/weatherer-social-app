import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const StyledItem = styled.li`
  border: 1px solid rgb(85, 85, 85);
  padding: 10px 15px 5px;

  &:hover {
    cursor: pointer;
  }
`

const StyledNameRow = styled.div`
  display: flex;

  .name {
    margin-right: 5px;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .username {
    color: rgb(150, 150, 150);
    font-size: 1.3rem;

    &:hover {
      text-decoration: none;
    }
  }

  .nameDetails:hover > .name {
    text-decoration: underline;
  }
`

const StyledContent = styled.div`
  padding: 5px 0 10px;
  font-size: 1.3rem;
`

const StyledIconsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .iconContainer {
    display: flex;
    align-items: center;
    width: 30px;
  }

  .icon {
    padding: 8px;
    border-radius: 50%;
    font-size: 1.5rem;
    transition: background-color .2s, color .2s;
  }

  .likeIcon {
    color: ${props => props.liked ? 'rgb(245, 80, 80)' : 'rgb(215, 215, 215)'};
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


const Post = ({ post, handleLikePost, handleUnlikePost, handleDeletePost, userLiked, isUserPost }) => {
  const [isLiked, setIsLiked] = useState(userLiked)
  const postAuthor = post.user
  const navigate = useNavigate()

  const handleLikeButton = (e) => {
    e.stopPropagation()
    if (isLiked) {
      handleUnlikePost()
    } else {
      handleLikePost()
    }
    setIsLiked(!isLiked)
  }

  const handleDeleteButton = (e) => {
    e.stopPropagation()
    handleDeletePost()
  }

  const handleReplyButton = (e) => {
    e.stopPropagation()
    navigate(`/home/post/${post.id}/reply`)
  }

  const viewUser = (e) => {
    e.stopPropagation()
    navigate(`/home/user/${postAuthor.username}`)
  }

  const viewPost = () => {
    navigate(`/home/post/${post.id}`)
  }

  return (
    <StyledItem onClick={viewPost}>
      <StyledNameRow>
        <div className="nameDetails" onClick={viewUser}>
          <span className="name">{postAuthor.name}</span>
          <span className="username">@{postAuthor.username}</span>
        </div>
      </StyledNameRow>
      <StyledContent>
        {post.content}
      </StyledContent>
      <StyledIconsRow liked={isLiked}>
        <div className="replyIconContainer iconContainer" onClick={handleReplyButton}>
          <FontAwesomeIcon className="replyIcon icon" icon={faComment} size='lg' />
          <span className="iconNum">{post.replies.length > 0 ? post.replies.length : ''}</span>
        </div>
        <div className="likeIconContainer iconContainer" onClick={handleLikeButton}>
          {isLiked
            ? <FontAwesomeIcon className="likeIcon icon" icon={faHeartSolid} size='lg' />
            : <FontAwesomeIcon className="likeIcon icon" icon={faHeartRegular} size='lg' />
          }
          <span className="likeNum iconNum">{post.likes ? post.likes : ''}</span>
        </div>
        <div className="deleteIconContainer iconContainer" onClick={handleDeleteButton}>
        {isUserPost &&
          <FontAwesomeIcon className="deleteIcon icon" icon={faTrashAlt} size='lg' />
        }
        </div>
      </StyledIconsRow>
    </StyledItem>
  )
}

export default Post