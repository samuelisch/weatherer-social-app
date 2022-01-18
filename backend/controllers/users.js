const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const fetchedUsers = await User
    .find({})
    .populate('posts', { content: 1, likes: 1 })
    .populate('likedPosts', { id: 1 })
  response.json(fetchedUsers)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 5) {
    return response.status(400).json({ error: 'Minimum password length of 5 required' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter