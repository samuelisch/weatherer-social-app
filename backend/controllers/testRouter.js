const router = require('express').Router()
const Post = require('../models/post')

router.post('/reset', async (request, response) => {
  await Post.deleteMany({})

  response.status(204).end()
})

module.exports = router