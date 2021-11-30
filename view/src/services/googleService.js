import Axios from 'axios'
import config from '../app.config'

export var googleService
export default googleService = {
  getBasicProfile,
  getContact,
  sendMail,
  getEventCalendar,
  createEventCalendar,
  updateEventCalendar,
  deleteEventCalendar
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
async function getEventCalendar(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/google/event`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function createEventCalendar(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/google/event/create`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function deleteEventCalendar(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/google/event/action`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function updateEventCalendar(payload) {
  return await Axios.put(`${config.ZATO_API_URL}/google/event/action`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

