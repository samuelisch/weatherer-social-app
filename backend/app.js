const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

console.log(`connecting to mongoDB ${process.env.MONGODB_URI}`)

const Post = require('./models/post')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MONGODB')
  })
  .catch((error) => {
    console.log('error connecting to MONGODB', error)
  })

app.use(cors());
app.use(express.json());

app.get('/api/posts', async (request, response) => {
  const fetchedPosts= await Post.find({})
  response.json(fetchedPosts)
});

app.get('/api/posts/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  if (post) {
    response.json(post)
  } else {
    response.status(404).end()
  }
});

app.post('/api/posts', async (request, response) => {
  const body = request.body;

  const post = new Post({
    content: body.content,
    likes: body.likes ? body.likes : 0,
  })

  const savedPost = await post.save()
  response.json(savedPost)
})

app.put('/api/posts/:id', async (request, response) => {
  const post = request.body

  const updatedPost = {
    content: post.content,
    likes: post.likes
  }

  const resultPost = await Post.findByIdAndUpdate(request.params.id, updatedPost)
  response.json(resultPost)
})

app.delete('/api/posts/:id', async (request, response) => {
  await Post.findByIdAndRemove(request.params.id)
  response.status(204).end()
});

module.exports = app;