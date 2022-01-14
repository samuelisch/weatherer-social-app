const postsRouter = require('express').Router();
const Post = require('../models/post')

postsRouter.get('/', async (request, response) => {
  const fetchedPosts= await Post.find({})
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

postsRouter.post('/', async (request, response) => {
  const body = request.body;

  const post = new Post({
    content: body.content,
    likes: body.likes ? body.likes : 0,
  })

  const savedPost = await post.save()
  response.json(savedPost)
})

postsRouter.put('/:id', async (request, response) => {
  const post = request.body

  const updatedPost = {
    content: post.content,
    likes: post.likes
  }

  const resultPost = await Post.findByIdAndUpdate(request.params.id, updatedPost, {new: true})
  response.json(resultPost)
})

postsRouter.delete('/:id', async (request, response) => {
  await Post.findByIdAndRemove(request.params.id)
  response.status(204).end()
});

module.exports = postsRouter;