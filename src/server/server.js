import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as constants from './constants';

Vue.use(VueAxios, axios)

export default {
    async validateUserLogin(payload) {
        return await Vue.axios.post(constants.baseUrl + constants.signIn, {
            ...payload
        })
        .then(function (response) {
            delete response.data.hash;
            return (response.data);
        })
        .catch(function (error) {
            console.log(err);
            return err;
        });        
    },
    async getUsersInfo(payload) {
        return await Vue.axios.post(constants.baseUrl + constants.rollNo)
        .then((response) => {
            return response.data;
        })
        .catch(err => console.log(err));
    }
}