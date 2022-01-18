import axios from 'axios'
const url = '/api/users'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${url}/${id}`)
  return response.data
}

const create = async (newUser) => {
  const response = await axios.post(url, newUser)
  return response.data
}

const userService = {
  getAll,
  getOne,
  create,
}

export default userService