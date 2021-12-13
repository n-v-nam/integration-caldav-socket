/*=========================================================================================
  File Name: moduleUserManagement.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
==========================================================================================*/


import state from './moduleUserManagementState.js'
import mutations from './moduleUserManagementMutations.js'
import actions from './moduleUserManagementActions.js'
import getters from './moduleUserManagementGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

