import axios from 'axios'
const url = '/api/posts'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(url, config)
  return response.data
}

const getOne = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(`${url}/${id}`, config)
  return response.data
}

const create = async (content) => {
  const config = {
    headers: { Authorization: token }
  }

  const newObj = { content, likes: 0}
  const response = await axios.post(url, newObj, config)
  return response.data
}

const reply = async (content, id) => {
  const config = {
    headers: { Authorization: token }
  }

  const newObj = { content, likes: 0}
  const response = await axios.post(`${url}/${id}`, newObj, config)
  return response.data
}

const update = async (id, newObj, action) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${url}/${id}/${action}`, newObj, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${url}/${id}`, config)
  return response.data
}

const postService = {
  getAll,
  getOne,
  create,
  reply,
  setToken,
  update,
  remove
}

export default postService