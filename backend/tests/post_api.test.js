const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)
const Post = require('../models/post')
const User = require('../models/user')
const helper = require('./testHelper')

let token; //JSON web token

beforeEach(async () => {
  const testUser = {
    username: 'testuser',
    password: 'password'
  }

  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    await api
      .post('/api/users')
      .send(user)
  }
  const loginDetails = await api.post('/api/login').send(testUser)
  token = loginDetails.body.token

  await Post.deleteMany({})
  for (let post of helper.initialPosts) {
    await api
      .post('/api/posts')
      .set('Authorization', `bearer ${token}`)
      .send(post)
  }
})

describe('when there are initial posts', () => {
  test('posts are returned as JSON', async () => {
    await api
      .get('/api/posts')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all posts are returned', async () => {
    const response = await api.get('/api/posts')
    expect(response.body).toHaveLength(helper.initialPosts.length)
  })

  test('specific content can be obtained from fetched posts', async () => {
    const response = await api.get('/api/posts')
    const postContents = response.body.map(p => p.content)

    expect(postContents).toContain('test post')
  })
})

describe('addition of new post', () => {
  test('a valid post can be added', async () => {
    const newPost = {
      content: 'hello new post',
      likes: 1
    }

    await api
      .post('/api/posts')
      .set('Authorization', `bearer ${token}`)
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1)
    const postContents = postsAtEnd.map(p => p.content)
    expect(postContents).toContain('hello new post')
  })

  test('post without content will not be added', async () => {
    const newPost = {
      likes: 0
    }

    await api
      .post('/api/posts')
      .set('Authorization', `bearer ${token}`)
      .send(newPost)
      .expect(400)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
  })

  test('post with empty content will not be added', async () => {
    const newPost = {
      content: '',
      likes: 0
    }

    await api
      .post('/api/posts')
      .set('Authorization', `bearer ${token}`)
      .send(newPost)
      .expect(400)

      const postsAtEnd = await helper.postsInDb()
      expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
  })

  test('post without likes will still be added', async () => {
    const newPost = {
      content: 'tester'
    }

    await api
      .post('/api/posts')
      .set('Authorization', `bearer ${token}`)
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1)
    const postContents = postsAtEnd.map(p => p.content)
    expect(postContents).toContain('tester')
  })

  test('post without token will fail and return 401', async () => {
    const newPost = {
      content: 'testpost',
      likes: 0
    }

    await api
      .post('/api/posts')
      .send(newPost)
      .expect(401)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
  })

  test('post with wrong token will return 401 error', async () => {
    const newPost = {
      content: 'testpost',
      likes: 0
    }

    await api
      .post('/api/posts')
      .set('Authorization', `bearer incorrecttoken`)
      .send(newPost)
      .expect(401)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
  })
})

describe('viewing specific post', () => {
  test('a specific post can be viewed', async () => {
    const postsAtStart = await helper.postsInDb()
    const postToView = postsAtStart[0]

    const resultPost = await api
      .get(`/api/posts/${postToView.id}`)
      .expect(200)
      
    const processedPostToView = JSON.parse(JSON.stringify(postToView))

    expect(resultPost.body).toEqual(processedPostToView)
  })

  test('fails with code 400 if id is invalid', async () => {
    const invalidId = 't8943fj938ug45hj34589'

    await api
      .get(`/api/posts/${invalidId}`)
      .expect(400)
  })

  test('fails with code 404 if non exisitng id', async () => {
    const nonExistingIdPost = await helper.nonExistingPostId()

    await api
      .get(`/api/posts/${nonExistingIdPost}`)
      .expect(404)
  })
})

describe('updating a post', () => {
  test('succeeds in liking when request is valid', async () => {
    const postsAtStart = await helper.postsInDb()
    const postToUpdate = postsAtStart[0]
    const updatedPost = {
      likes: 10
    }

    await api
      .put(`/api/posts/${postToUpdate.id}/like`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd.length).toEqual(postsAtStart.length)
  })

  test('fails with code 400 if invalid id', async () => {
    const invalidId = '49fj309f3409n34nf'
    const updatedPost = {
      likes: 10
    }

    await api
      .put(`/api/posts/${invalidId}/like`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedPost)
      .expect(400)
  })

  test('fails with code 404 if non exisitng id', async () => {
    const nonExistingIdPost = await helper.nonExistingPostId()
    const updatedPost = {
      likes: 10
    }

    await api
      .put(`/api/posts/${nonExistingIdPost}/like`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedPost)
      .expect(404)
  })
})

describe('deletion of a post', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const postsAtStart = await helper.postsInDb()
    const postToDelete = postsAtStart[0]

    await api
      .delete(`/api/posts/${postToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length - 1)
    const postContents = postsAtEnd.map(p => p.content)
    expect(postContents).not.toContain(postToDelete.content)
  })

  test('fails with code 400 if id is invalid', async () => {
    const invalidId = 'eifjniwopergh2490t9tj'

    await api
      .delete(`/api/posts/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('fails with code 404 if non-existing id', async () => {
    const nonExistingIdPost = await helper.nonExistingPostId()

    await api
      .delete(`/api/posts/${nonExistingIdPost}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })

  test('delete without token will fail and return 401', async () => {
    const postsAtStart = await helper.postsInDb()
    const postToDelete = postsAtStart[0]

    await api
      .delete(`/api/posts/${postToDelete.id}`)
      .expect(401)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
  })

  test('post with wrong token will return 401 error', async () => {
    const postsAtStart = await helper.postsInDb()
    const postToDelete = postsAtStart[0]

    await api
      .delete(`/api/posts/${postToDelete.id}`)
      .set('Authorization', `bearer incorrecttoken`)
      .expect(401)

    const postsAtEnd = await helper.postsInDb()
    expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})