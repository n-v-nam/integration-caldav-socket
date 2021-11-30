import Axios from "axios";
import config from "../app.config";

export var userService;
export default userService = {
    login,
    addConnection,
    getListConnection,
    getAccessToken
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
async function addConnection(payload) {
    return await Axios.post(`${config.LOCAL_API_URL}/connection`, payload)
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
async function getListConnection(data) {
    return await Axios.get(`${config.LOCAL_API_URL}/connection/${data.username}`)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
async function getAccessToken(payload) {
    return await Axios.get(`${config.LOCAL_API_URL}/connection/${payload.username}/${payload.service}/token`)
    .then(response => {
        return Promise.resolve(response.data)
    })
    .catch(error =>{
        return Promise.reject(error);
    })
}
