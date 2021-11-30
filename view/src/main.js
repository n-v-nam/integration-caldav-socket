import Vue from 'vue'
import App from './App.vue'

// Vue Router
import router from './router'

// Tailwind
import './assets/css/main.css'

// Validation
import VeeValidate from "vee-validate";
Vue.use(VeeValidate)

// calendar
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'v'
})
// Vuex
import store from './store/store'

// axios
import axios from 'axios'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' // Vuesax
import 'material-icons/iconfont/material-icons.css'
import './assets/tailwind.css'
Vue.use(Vuesax)

import GAuth from 'vue-google-oauth2'
const gAuthOption = {
  clientId: '217858815782-qe36u4q8232qfslg1ut589rc7psdjcio.apps.googleusercontent.com',
  scope: 'profile email https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/gmail.send',
  prompt: 'consent',
  fetch_basic_profile: true,
}
Vue.use(GAuth, gAuthOption)

Vue.config.productionTip = false

axios.interceptors.request.use(
  function(config) {
    if(!store.state.loads) store.dispatch("updateLoading", true);
    if (!config.noToken) {
      const token = sessionStorage.getItem("token")
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    config.headers["X-Requested-With"] = "X" + "MLHttpRequest";
    return config;
  },
  function(err) {
    if (store.state.loading) {
      store.dispatch("updateLoading", false);
    }
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
        let result = response.data
        if (result.code) {
            let code = result.code
            if (code === 403) {
                sessionStorage.removeItem('token')
                window.location.href = 'login'
            }
        }
    }
    if (store.state.loading) {
      store.dispatch("updateLoading", false)
    }
    return response;
  },
  function(error) {
    if (store.state.loading) {
      store.dispatch("updateLoading", false)
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
