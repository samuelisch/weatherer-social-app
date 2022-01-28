import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserByUsername } from '../../../reducers/userReducer'
import PostsList from '../posts/PostsList'
import ProfileHeader from './ProfileHeader'

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
          <ProfileHeader user={user} />
          {user &&
            <PostsList filterKey={user.id} type="userId" />
          }
        </div>
      }
    </div>
  )
}

export default User