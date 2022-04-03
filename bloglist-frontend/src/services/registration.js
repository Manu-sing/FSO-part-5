import axios from 'axios'
const baseUrl = '/api/users'

const registration = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { registration }