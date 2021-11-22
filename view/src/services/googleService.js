import Axios from 'axios'
import config from '../app.config'

export var googleService
export default googleService = {
  authCode,
  getBasicProfile
}
async function authCode(payload) {
  return await Axios.post(`${config.LOCAL_API_URL}/connection`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function getBasicProfile(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/google/profile`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

