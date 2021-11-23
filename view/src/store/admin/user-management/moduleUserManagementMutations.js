/*=========================================================================================
  File Name: moduleUserMutations.js
  Description: User Module Mutations
  ----------------------------------------------------------------------------------------
==========================================================================================*/


export default {
  setToken(state, payload) {
    Object.assign(state.accessToken, {google: payload})
  },
  setBasicProfile(state, payload){
    if(payload.service_code == 'google') Object.assign(state.basicProfile, {google: payload})
    else Object.assign(state.basicProfile, {zalo: payload})
  },
  setContact(state, payload){
    if(payload.service_code == 'google') Object.assign(state.contact, {google: payload.contacts})
    else Object.assign(state.contact, {zalo: payload})
  }

}