/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------

==========================================================================================*/

// *From Auth - Data will be received from auth provider
const userDefaults = ''

// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components


// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
  userDefaults: userDefaults,
  userId: 1,
  notification: {
    status: false,
    message: null,
    type: null,
  },
  loading: false,
  silentLoading: false
}

export default state
