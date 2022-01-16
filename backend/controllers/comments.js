const commentsRouter = require('express').Router();
const Comment = require('../models/comment');

commentsRouter.get('/', async (request, response) => {
  const fetchedComments = await Comment.find({})
  response.json(fetchedComments)
});

commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findById(request.params.id)
  if (comment) {
    response.json(comment)
  } else {
    response.status(404).end()
  }
});

commentsRouter.post('/', async (request, response) => {
  const body = request.body;

  const comment = new Comment({
    content: body.content,
    likes: body.likes ? body.likes: 0,
  })

  const savedComment = await comment.save();
  response.json(savedComment)
});

commentsRouter.put('/:id', async (request, response) => {
  const comment = request.body

  const updatedComment = {
    content: comment.content,
    likes: comment.likes
  }

  const resultComment = await Comment.findByIdAndUpdate(request.params.id, updatedComment, {new: true})
  if (resultComment) {
    response.json(resultComment)
  } else {
    response.status(404).end()
  }
})

commentsRouter.delete('/:id', async (request, response) => {
  const deletedComment = await Comment.findByIdAndRemove(request.params.id)
  if (deletedComment) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
});

module.exports = commentsRouter;