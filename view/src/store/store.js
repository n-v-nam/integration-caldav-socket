/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------

==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import userManagement from './admin/user-management/moduleUserManagement'

Vue.use(Vuex)


const store = new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        // auth: moduleAuth,
        userManagement,
    },
    // //  encode local Storage
    // //  plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !== 'production'
});

// Todo: check latter
// store.dispatch("browserSession/init");

export default store;
