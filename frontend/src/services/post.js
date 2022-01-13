import axios from 'axios'

const url = 'http://localhost:3001/posts'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const create = async (content) => {
  const newObj = { content, likes: 0}
  const response = await axios.post(newObj)
  return response.data
}

const postService = {
  getAll
}

export default postService