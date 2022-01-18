const postsRouter = require('express').Router();
const Post = require('../models/post')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor;

postsRouter.get('/', async (request, response) => {
  const fetchedPosts = await Post
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('replyToPost', { content: 1, likes: 1 })
    .populate('replies', { content: 1, likes: 1 })
  response.json(fetchedPosts)
});

postsRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  if (post) {
    response.json(post)
  } else {
    response.status(404).end()
  }
});

postsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const post = new Post({
    content: body.content,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost._id)
  await User.findByIdAndUpdate(user._id, {posts: user.posts})

  response.json(savedPost)
})

postsRouter.put('/:id/:action', userExtractor, async (request, response) => {
  const post = request.body
  const user = request.user
  const action = request.params.action

  const updatedPost = {
    likes: post.likes
  }

  const resultPost = await Post.findByIdAndUpdate(request.params.id, updatedPost, {new: true})
  if (resultPost) {
    if (action === 'like') {
      user.likedPosts = [...user.likedPosts, resultPost._id]
    } else if (action === 'unlike') {
      //converts ids to strings, for comparison.
      user.likedPosts = user.likedPosts.filter(postId => postId.toString() !== resultPost._id.toString())
    }
    await User.findByIdAndUpdate(user._id, {likedPosts: user.likedPosts})

    response.json(resultPost)
  } else {
    response.status(404).end()
  }
})

postsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const post = await Post.findById(request.params.id)

  if (!post) {
    response.status(404).end()
  }

  if (post.user.toString() === user.id.toString()) {
    await Post.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({ error: 'item not created by user' })
  }
});

module.exports = postsRouter;