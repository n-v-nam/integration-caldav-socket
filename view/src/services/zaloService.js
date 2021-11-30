import Axios from 'axios'
import config from '../app.config'

export var zaloService
export default zaloService = {
  requestToken,
  getBasicProfile
}
async function requestToken(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/zalo/token`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function getBasicProfile(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/zalo/profile`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}


