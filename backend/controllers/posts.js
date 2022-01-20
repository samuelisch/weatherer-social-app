const postsRouter = require('express').Router();
const Post = require('../models/post')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor;

postsRouter.get('/', async (request, response) => {
  const fetchedPosts = await Post
    .find({})
    .populate('user', { username: 1, name: 1 })
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

postsRouter.post('/:id', userExtractor, async (request,response) => {
  const body = request.body
  const user = request.user

  const post = new Post({
    content: body.content,
    likes: 0,
    user: user._id,
    replyToPost: request.params.id
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost._id)
  await User.findByIdAndUpdate(user._id, {posts: user.posts})

  const replyToPost = await Post.findById(request.params.id)
  replyToPost.replies = replyToPost.replies.concat(savedPost._id)
  await Post.findByIdAndUpdate(request.params.id, {replies: replyToPost.replies})

  response.json(savedPost)
})

postsRouter.put('/:id/:action', userExtractor, async (request, response) => {
  const post = request.body
  const user = request.user
  const action = request.params.action

  const likedByUsers = action === 'like' 
  ? [...post.likedBy, user._id] 
  : action === 'unlike' 
  ? post.likedBy.filter(userId => userId.toString() !== user._id.toString())
  : post.likedBy

  const updatedPost = {
    likes: post.likes,
    likedBy: likedByUsers
  }

  const resultPost = await Post
    .findByIdAndUpdate(request.params.id, updatedPost, {new: true})
    .populate('user', { username: 1, name: 1 })
  if (resultPost) {
    if (action === 'like') {
      user.likedPosts = [...user.likedPosts, resultPost._id]
    } else if (action === 'unlike') {
      //converts ids to strings, for comparison.
      user.likedPosts = user.likedPosts.filter(postId => postId.toString() !== resultPost._id.toString())
    }
    await User
      .findByIdAndUpdate(user._id, {likedPosts: user.likedPosts})
      .populate('posts', { content: 1 })

    response.json(resultPost)
  } else {
    response.status(404).end()
  }
})

postsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const post = await Post.findById(request.params.id)
  const removeLikedPost = (user) => user.likedPosts.filter(postId => postId.toString() !== post._id.toString())

  if (!post) {
    return response.status(404).end()
  }

  if (post.user.toString() !== user.id.toString()) {
    return response.status(400).json({ error: 'item not created by user' }) 
  }

  await Post.findByIdAndRemove(request.params.id)
  post.likedBy.forEach(async userId => {
    const userToEdit = await User.findById(userId.toString())
    const updatedLikedPosts = removeLikedPost(userToEdit)
    await User.findByIdAndUpdate(userId.toString(), {likedPosts: updatedLikedPosts})
  })

  response.status(204).end()
});

module.exports = postsRouter;