const Post = require('../models/post')
const User = require('../models/user')

const initialPosts = [
  {
    content: "test post",
    likes: 10
  },
  {
    content: "This second post talks about an app",
    likes: 5
  },
]

const initialUsers = [
  {
    username: 'root',
    name: 'superuser',
    password: 'password'
  },
  {
    username: 'testuser',
    name: 'testuser',
    password: 'password'
  }
]

const nonExistingPostId = async () => {
  const post = new Post({
    content: 'to be removed',
    likes: 1
  })
  await post.save()
  await post.remove()

  return post._id.toString()
}

const postsInDb = async () => {
  const posts = await Post.find({})
  return posts.map(post => post.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialPosts,
  initialUsers,
  nonExistingPostId,
  postsInDb,
  usersInDb,
}