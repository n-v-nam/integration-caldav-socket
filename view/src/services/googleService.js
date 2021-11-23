import Axios from 'axios'
import config from '../app.config'

export var googleService
export default googleService = {
  authCode,
  getBasicProfile,
  getContact,
  sendMail
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
async function getContact(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/google/contact`, payload)
    .then((response) => {
      return Promise.resolve(response.data.feed.entry)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function sendMail(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/google/send`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

