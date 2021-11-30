/*=========================================================================================
  File Name: moduleUserActions.js
  Description: User Module Actions
  ----------------------------------------------------------------------------------------
==============================*/
import userService from "../../../services/userService"
import googleService from "../../../services/googleService"
import zaloService from "../../../services/zaloService"
import microsoftService from "../../../services/microsoftService"

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
  addConnection(dispatch, params) {
    return userService.addConnection(params)
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

  /////////////////////////////////////////////////////
  ///                       GOOGLE                  ///
  /////////////////////////////////////////////////////

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
          const email = contact.gd$email ? contact.gd$email[0].address : null
          const phone = contact.gd$phoneNumber ? contact.gd$phoneNumber[0].$t : null
          return {name, email, phone}
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
  },
  getEventGoogle({commit}, payload){
    return googleService.getEventCalendar(payload)
      .then(response => {
        const events = response.items
        commit('setEventCalendar', Object.assign({service_code: 'google'}, {events}))
        return Promise.resolve(events)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  createEventGoogle(commit, payload){
    return googleService.createEventCalendar(payload)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  deleteEventGoogle(commit, payload){
    return googleService.deleteEventCalendar(payload)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  updateEventGoogle(commit, payload){
    return googleService.updateEventCalendar(payload)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },

    /////////////////////////////////////////////////////
  ///                       ZALO                  ///
  /////////////////////////////////////////////////////
  requestToken(commit, payload){
    return zaloService.requestToken(payload)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  getBasicProfileZalo({commit}, payload){
    return zaloService.getBasicProfile(payload)
      .then(response => {
        commit('setBasicProfile', Object.assign({service_code: 'zalo'}, response))
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },

  /////////////////////////////////////////////////////
  ///                    MICROSOFT                  ///
  /////////////////////////////////////////////////////

  requestTokenMicrosoft(commit, payload){
    return microsoftService.requestToken(payload)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  getProfileMicrosoft({commit}, payload){
    return microsoftService.getProfile(payload)
      .then(response => {
        commit('setBasicProfile', Object.assign({service_code: 'microsoft'}, response))
        return Promise.resolve(response)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  getContactMicrosoft({commit}, payload){
    return microsoftService.getListContact(payload)
      .then(response => {
        commit('setContact', Object.assign({service_code: 'microsoft'}, response))
        return Promise.resolve(response.value)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  getEventMicrosoft({commit}, payload){
    return microsoftService.getListEvent(payload)
      .then(response => {
        commit('setEventCalendar', Object.assign({service_code: 'microsoft'}, response))
        return Promise.resolve(response.value)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  createEventMicrosoft(commit, payload){
    return microsoftService.createEvent(payload)
      .then(response => {
        return Promise.resolve(response.value)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  deleteEventMicrosoft(commit, payload){
    return microsoftService.deleteEvent(payload)
      .then(response => {
        return Promise.resolve(response.value)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },
  updateEventMicrosoft(commit, payload){
    return microsoftService.updateEvent(payload)
      .then(response => {
        return Promise.resolve(response.value)
      })
      .catch(error =>{
        console.log(error);
        return Promise.reject(error)
      })
  },

}
