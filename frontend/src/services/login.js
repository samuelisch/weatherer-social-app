import axios from 'axios'
const url = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(url, credentials)
  return response.data
}

const loginService = {
  login,
}

export default loginService