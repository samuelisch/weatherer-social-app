import axios from 'axios'
const url = '/api/posts'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(url)
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

const update = async (id, newObj) => {
  const response = await axios.put(`${url}/${id}`, newObj)
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
  create,
  setToken,
  update,
  remove
}

export default postService