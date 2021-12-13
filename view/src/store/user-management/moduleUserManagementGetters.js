/*=========================================================================================
  File Name: moduleUserGetters.js
  Description: User Module Getters
  ----------------------------------------------------------------------------------------
==========================================================================================*/


export default {
  getNotification: state => state.notification,
  getAccessToken: state => state.accessToken,
  getBasicProfile: state => state.basicProfile,
  getContact: state => state.contact,
  getListEvent: state => state.eventCalendar
}
