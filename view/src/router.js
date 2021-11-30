import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import Error404 from './components/Error404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/error',
      name: 'Error',
      component: Error404,
    },
  ],
})
