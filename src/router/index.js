import Vue from 'vue'
import Router from 'vue-router'
import Marksheet from '@/components/Marksheet'
import Login from '@/components/Login'
import RollNoList from '@/components/RollNoList'
import AdminPanel from '@/components/AdminPanel'

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
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel
    },
    {
      path: '/admin/rollNoList',
      name: 'RollNoList',
      component: RollNoList
    },
  ]
})
