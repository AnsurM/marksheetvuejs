import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            isLoggedIn: false,
            rollno: null,
            name: null,
            email: null    
        },
    },
    getters: {
        getLoginStatus (state) {
            return state.user.isLoggedIn;
        },
        getUserId(state) {
            return state.user.getUserId;
        }
    },
    mutations: {
        setLoginData(state, payload) {
            state.user = payload;
            return state.user
        }    
    },
    actions : {
        setLoginData(context, payload) {
            console.log("setLoginData invoked..", payload);

            if(payload.isLoggedIn == undefined || payload.rollno.length < 1)
            return Promise.reject('Invalid data passed. Please try again.');

            context.commit('setLoginData', payload);
            return Promise.resolve(true);
        }
    }
})