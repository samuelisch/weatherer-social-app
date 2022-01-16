const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')

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

const initialUsers = []

const initialComments = [
  {
    content: 'test comment',
    likes: 0
  },
  {
    content: 'commenting from user',
    likes: 1
  },
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

const nonExistingCommentId = async () => {
  const comment = new Comment({
    content: 'toberemoved',
    likes: 0
  })
  await comment.save()
  await comment.remove()

  return comment._id.toString()
}

const postsInDb = async () => {
  const posts = await Post.find({})
  return posts.map(post => post.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const commentsInDb = async () => {
  const comments = await Comment.find({})
  return comments.map(comment => comment.toJSON())
}

module.exports = {
  initialPosts,
  initialUsers,
  initialComments,
  nonExistingPostId,
  nonExistingCommentId,
  postsInDb,
  usersInDb,
  commentsInDb
}