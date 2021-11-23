/*=========================================================================================
  File Name: moduleUserActions.js
  Description: User Module Actions
  ----------------------------------------------------------------------------------------
==============================*/
import userService from "../../../services/userService"
import googleService from "../../../services/googleService"

export default {
  login({dispatch}, params) {
    return userService.login(params)
      .then(response => {
        dispatch("alertSuccess", response.data.message, { root: true });
        return Promise.resolve(response.data)
      })
      .catch(error =>{
        dispatch("alertError", "Error", { root: true });
        console.log(error);
        return Promise.reject(error)
      })
  },
  getListConnection(dispatch, params) {
    return userService.getListConnection(params)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  authCode(dispatch, params) {
    return googleService.authCode(params)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  getAccessToken({commit}, payload){
    return userService.getAccessToken(payload)
      .then(response => {
        commit('setToken', response.data)
        return Promise.resolve(response.data)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  getBasicProfileGoogle({commit}, payload){
    return googleService.getBasicProfile(payload)
      .then(response => {
        commit('setBasicProfile', Object.assign({service_code: 'google'}, response))
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  getContactGoogle({commit}, payload){
    return googleService.getContact(payload)
      .then(response => {
        const contacts = response.map(contact => {
          const  name = contact.title.$t
          const email = contact.gd$email[0].address
          return {name, email}
        })
        commit('setContact', Object.assign({service_code: 'google'}, {contacts: contacts}))
        return Promise.resolve(contacts)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  sendMail(commit, payload){
    return googleService.sendMail(payload)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  }
}
