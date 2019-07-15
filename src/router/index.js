import Vue from 'vue'
import Router from 'vue-router'
import Marksheet from '@/components/Marksheet'
import Login from '@/components/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: Login
    },
    {
      path: '/marksheet',
      name: 'Marksheet',
      component: Marksheet
    },
  ]
})
