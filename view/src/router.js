import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Main from './components/Main.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import Profile from './components/Profile.vue'
import EnterCode from './components/EnterCode.vue'
import ChangePassword from './components/ChangePassword.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: '/sign-up-confirm',
      name: 'enter-code',
      component: EnterCode,
    },
    {
      path: '/',
      name: 'main',
      redirect: '/home',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Dashboard,
        },
        {
          path: '/me/profile',
          name: 'profile',
          component: Profile,
        },
        {
          path: '/me/change-password',
          name: 'chang-password',
          component: ChangePassword,
        },
      ]
    },
  ],
})
