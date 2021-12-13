/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------

==========================================================================================*/

const mutations = {
  UPDATE_USER(state, payload){
    state.userDefaults = payload
  },
///////////////////////////////////////////////////

  UPDATE_LOADING(state, payload){
    state.loading = payload;
  },
  UPDATE_SILENT_LOADING(state, payload){
    state.silentLoading = payload;
  },
  SET_USER_ID(state, payload){
    state.userId = payload
  },

////////////////////////////////////////////////////////
////// ALERT
//////////////////////////////////////////////////////

  ALERT_SUCCESS(state, payload) {
    state.notification.status = true;
    state.notification.type = "success";
    state.notification.message = payload;
  },
  ALERT_ERROR(state, payload) {
    state.notification.status = true;
    state.notification.type = "danger";
    state.notification.message = payload;
  },
  ALERT_CLEAR(state) {
    state.notification.status = false;
    state.notification.type = null;
    state.notification.message = null;
  }

}

export default mutations

