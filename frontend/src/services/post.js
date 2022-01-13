import axios from 'axios'

const url = 'http://localhost:3001/posts'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const create = async (content) => {
  const newObj = { content, likes: 0}
  const response = await axios.post(url, newObj)
  return response.data
}

const update = async (id, newObj) => {
  const response = await axios.put(`${url}/${id}`, newObj)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${url}/${id}`)
  return response.data
}

const postService = {
  getAll,
  create,
  update,
  remove
}

export default postService