const Post = require('../models/post')

const initialPosts = [
  {
    content: "This post is talking about the weather",
    likes: 10
  },
  {
    content: "This second post talks about an app",
    likes: 5
  },
]

const nonExistingId = async () => {
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
  return post.map(post => post.toJSON())
}

module.exports = {
  initialPosts,
  nonExistingId,
  postsInDb
}