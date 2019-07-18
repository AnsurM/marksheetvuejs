import Vue from 'vue'
import Router from 'vue-router'
import Marksheet from '@/components/Marksheet'
import Login from '@/components/Login'
import RollNoList from '@/components/RollNoList'
import AdminPanel from '@/components/AdminPanel'
import RegisterStudent from '@/components/RegisterStudent'

import {store} from '../store/store';

Vue.use(Router)

let checkAccessState = () => store.getters.getLoginStatus;

const router = new Router({
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
    {
      path: '/admin/registerstudent',
      name: 'Register New Student',
      component: RegisterStudent
    },
  ]
})

router.beforeEach((to,from,next) => {
  if(to.path != '/')
  {
    if(checkAccessState()){
      next();
    }
    else{
      next('/');
    }  
  }
  else
  {
    next();
  }
})

export default router;