import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserByUsername } from '../../../reducers/userReducer'
import styled from 'styled-components'
import PostsList from '../posts/PostsList'

const User = () => {
  const [loaded, setLoaded] = useState(false)
  const params = useParams()
  const username = params.username
  const user = useSelector(state => {
    return selectUserByUsername(state.users, username)
  })

  useEffect(() => {
    if (user) {
      setLoaded(true)
    }
  }, [user])
  return (
    <div>
      {loaded &&
        <div>
          {user 
            ? <>
                <h2>{user.name}'s profile</h2>
                <p>{user.username}</p>
              </>
            : <h1>User not found</h1>
          }
          {user &&
            <PostsList userId={user.id} />
          }
        </div>
      }
    </div>
  )
}

export default User