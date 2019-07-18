import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as constants from './constants';
import {store} from '../store/store';

Vue.use(VueAxios, axios)

export default {
    async validateUserLogin(payload) {
        return await Vue.axios.post(constants.baseUrl + constants.signIn, {
            ...payload
        })
        .then(function (response) {
            // console.log(response.data)
            delete response.data.hash;
            return (response.data);
        })
        .catch(function (error) {
            // console.log('err: ', error);
            return ('Incorrect email/password provided.');
        });        
    },
    async getUsersInfo() {
        console.log('server get info called.');
        return await Vue.axios.post(constants.baseUrl + constants.rollNo)
        .then((response) => {
            return response.data;
        })
        .catch(err => console.log(err));
    },
    async getRollNoList() {
        const myfiltered = (await this.getUsersInfo()).map(user => (user.rollno + ' - ' + user.name))  ;
        myfiltered.splice(0,1);
        return await myfiltered;
    },
    async getUsersResults(payload) {
        return await Vue.axios.post(constants.baseUrl + constants.results, {rollNo: payload})
        .then((response) => {
            return response.data;
        })
        .catch(err => console.log(err));
    },
    async uploadResult(payload) {
        return await Vue.axios.put(constants.baseUrl + constants.uploadResult, payload)
        .then((response) => {
            return response.data;
        })
        .catch(err => console.log(err));
    },
    async registerNewStudent({email, name, password}) {
        return await Vue.axios.post(constants.baseUrl + constants.register, {email, name, password})
        .then((response) => {
            return response.data;
        })
        .catch(err => console.log(err));
    }
}