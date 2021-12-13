import Axios from "axios";
import config from "../app.config";

export var userService;
export default userService = {
    login,
    register,
    changePassword,
    resetPassword,
    changeProfile,
    getProfile,
    confirmRegister,
    addConnection,
    getListConnection,
    getAccessToken,
    getNotification,
    sendSMS
}
async function login(data) {
    return await Axios.post(`${config.LOCAL_API_URL}/user/login`,data)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function register(data) {
    return await Axios.post(`${config.LOCAL_API_URL}/user/register`,data)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function confirmRegister(data) {
    return await Axios.post(`${config.LOCAL_API_URL}/user/register-confirm`,data)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function changePassword(data) {
    return await Axios.put(`${config.LOCAL_API_URL}/user/change-password`,data)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function resetPassword(data) {
    return await Axios.post(`${config.LOCAL_API_URL}/user/reset-password`,data)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function getProfile() {
    return await Axios.get(`${config.LOCAL_API_URL}/me/profile`)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function changeProfile(data) {
    return await Axios.put(`${config.LOCAL_API_URL}/user/change-profile`,data)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}

async function getNotification() {
    return await Axios.post(`${config.LOCAL_API_URL}/user/notification`)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function addConnection(payload) {
    return await Axios.post(`${config.LOCAL_API_URL}/connection`, payload)
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
async function getListConnection() {
    return await Axios.get(`${config.LOCAL_API_URL}/me/connection`)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function getAccessToken(payload) {
    return await Axios.get(`${config.LOCAL_API_URL}/me/connection/${payload.service}/token`)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function sendSMS(payload) {
    return await Axios.post(`${config.ZATO_API_URL}/sms`, payload)
    .then(response => {
        return Promise.resolve(response)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
