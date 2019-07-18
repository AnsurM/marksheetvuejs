import Vue from 'vue'
import Router from 'vue-router'
import Marksheet from '@/components/Marksheet'
import Login from '@/components/Login'
import RollNoList from '@/components/RollNoList'
import AdminPanel from '@/components/AdminPanel'

import {store} from '../store/store';

Vue.use(Router)

let checkAccessState = () => store.getters.getLoginStatus;
// let beforeEnter = (to, from, next) => {
//   if(!checkAccessState()){
//     next('/');
//   }
//   else{
//     next(to);
//   }
// };

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
      beforeEnter: (to, from, next) => {
        if(checkAccessState()){
          next();
        }
        else{
          next('/');
        }
     },
      component: Marksheet
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      beforeEnter: (to, from, next) => {
        if(checkAccessState()){
          next();
        }
        else{
          next('/');
        }
     },
      component: AdminPanel
    },
    {
      path: '/admin/rollNoList',
      name: 'RollNoList',
      component: RollNoList
    },
  ]
})
