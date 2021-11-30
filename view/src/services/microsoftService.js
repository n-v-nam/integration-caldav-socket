/** @format */

import Axios from 'axios'
import config from '../app.config'

export var microsoftService
export default microsoftService = {
  requestToken,
  getProfile,
  getListEvent,
  getListContact,
  createEvent,
  updateEvent,
  deleteEvent
}
async function requestToken(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/microsoft/token`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function getProfile(payload) {
  try {
    const profile = await Axios.post(`${config.ZATO_API_URL}/microsoft/profile`, payload).then((response) => {
      return response.data
    })
    const picture = await Axios.post(`${config.ZATO_API_URL}/microsoft/avatar`, payload).then((response) => {
      return response.data
    })
    const response = {
      profile: profile,
      picture: picture
    }
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
async function getListContact(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/microsoft/contact`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function getListEvent(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/microsoft/event`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function createEvent(payload) {
  return await Axios.put(`${config.ZATO_API_URL}/microsoft/event`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function deleteEvent(payload) {
  return await Axios.post(`${config.ZATO_API_URL}/microsoft/event/action`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
async function updateEvent(payload) {
  return await Axios.put(`${config.ZATO_API_URL}/microsoft/event/action`, payload)
    .then((response) => {
      return Promise.resolve(response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
