const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const api = supertest(app);
const Comment = require('../models/comment');
const helper = require('./testHelper')

beforeEach(async () => {
  await Comment.deleteMany({});
  await Comment.insertMany(helper.initialComments)
})

describe('when there are comments initially saved', () => {
  test('comments are returned as json', async () => {
    await api
      .get('/api/comments')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all comments are returned', async () => {
    const response = await api.get('/api/comments')
    expect(response.body).toHaveLength(helper.initialComments.length)
  })

  test('a specific content can be obtained within returned comments', async () => {
    const response = await api.get('/api/comments')
    const commentContents = response.body.map(c => c.content)
    
    expect(commentContents).toContain('test comment')
  })
})

describe('addition of a new comment', () => {
  test('a valid comment can be added', async () => {
    const newComment = {
      content: 'this is a comment',
      likes: 1
    }

    await api
      .post('/api/comments')
      .send(newComment)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const commentsAtEnd = await helper.commentsInDb()
    expect(commentsAtEnd).toHaveLength(helper.initialComments.length + 1)
    const commentContents = commentsAtEnd.map(c => c.content)
    expect(commentContents).toContain('this is a comment')
  })

  test('a comment without content cannot be added', async () => {
    const newComment = {
      likes: 1
    }

    await api
      .post('/api/comments')
      .send(newComment)
      .expect(400)
      
    const commentsAtEnd = await helper.commentsInDb()
    expect(commentsAtEnd).toHaveLength(helper.initialComments.length)
  })

  test('a comment without likes will still be added' , async () => {
    const newComment = {
      content: 'new comment'
    }

    await api
      .post('/api/comments')
      .send(newComment)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const commentsAtEnd = await helper.commentsInDb()
    expect(commentsAtEnd).toHaveLength(helper.initialComments.length + 1)
    const commentContents = commentsAtEnd.map(c => c.content)
    expect(commentContents).toContain('new comment')
  })
})

describe('viewing a specific blog', () => {
  test('a specific comment can be viewed', async () => {
    const commentsAtStart = await helper.commentsInDb()
    const commentToView = commentsAtStart[0]

    const resultComment = await api
      .get(`/api/comments/${commentToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedComment = JSON.parse(JSON.stringify(commentToView))
    expect(resultComment.body).toEqual(processedComment)
  })

  test('fails with code 400 if invalid id', async () => {
    const invalidId = '3hfbnf4iuf2348948942fh248'

    await api
      .get(`/api/comments/${invalidId}`)
      .expect(400)
  })

  test('fails with code 404 if non exisitng id', async () => {
    const nonExistingIdComment = await helper.nonExistingCommentId()

    await api
      .get(`/api/comments/${nonExistingIdComment}`)
      .expect(404)
  })
})

describe('updating a comment', () => {
  test('succeeds when request is valid', async () => {
    const commentsAtStart = await helper.commentsInDb()
    const commentToUpdate = commentsAtStart[0]
    const updatedComment = {
      likes: 60
    }

    await api
      .put(`/api/comments/${commentToUpdate.id}`)
      .send(updatedComment)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const commentsAtEnd = await helper.commentsInDb()
    expect(commentsAtEnd.length).toEqual(commentsAtStart.length)
  })

  test('fails with code 400 if invalid id', async () => {
    const invalidId = '3hfbnf4iuf2348948942fh248'

    await api
      .put(`/api/comments/${invalidId}`)
      .expect(400)
  })

  test('fails with code 404 if non exisitng id', async () => {
    const nonExistingIdComment = await helper.nonExistingCommentId()

    await api
      .put(`/api/comments/${nonExistingIdComment}`)
      .expect(404)
  })
})

describe('deletion of comment', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const commentsAtStart = await helper.commentsInDb()
    const commentToDelete = commentsAtStart[0]

    await api
      .delete(`/api/comments/${commentToDelete.id}`)
      .expect(204)

    const commentsAtEnd = await helper.commentsInDb()
    expect(commentsAtEnd).toHaveLength(helper.initialComments.length - 1)

    const commentContents = commentsAtEnd.map(c => c.content)
    expect(commentContents).not.toContain(commentToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})