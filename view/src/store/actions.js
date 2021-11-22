
const actions = {
  updateUser({commit}, payload){
    commit('UPDATE_USER', payload, {root: true})
  },

  //////////////////////////////////
  updateLoading({commit}, payload){
    commit('UPDATE_LOADING', payload);
  },
  ////////////////////////////////////////////////
  // SHOW ALERT
  ///////////////////////////////////////////////
  alertSuccess({ commit }, payload) {
      commit("ALERT_SUCCESS", payload);
      commit("ALERT_CLEAR");
  },
  alertError({ commit }, payload) {
    commit("ALERT_ERROR", payload);
    commit("ALERT_CLEAR");
  },
}

export default actions
