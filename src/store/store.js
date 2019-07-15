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
        results: null
    },
    getters: {
        getLoginStatus (state) {
            return state.user.isLoggedIn;
        },
        getUserId(state) {
            return state.user.getUserId;
        },
        getUserDetails(state) {
            return state.user;
        },
        getResults(state) {
            return state.results;
        }
    },
    mutations: {
        setLoginData(state, payload) {
            state.user = payload;
            return state.user
        },
        setResults(state, payload)
        {
            state.results = payload;
        }
    },
    actions : {
        setLoginData(context, payload) {
            console.log("setLoginData invoked with: ", payload);

            if(payload.isLoggedIn == undefined || payload.rollno.length < 1)
            return Promise.reject('Invalid data passed. Please try again.');

            context.commit('setLoginData', payload);
            return Promise.resolve(true);
        },
        setResults(context, payload) {
            console.log("setResults action initiated with: ", payload);
            if(payload.length > 0) {
                context.commit('setResults', payload);
                return Promise.resolve(true);
            }
            else
            {
                return Promise.reject('Invalid marks object received.');
            }
        }
    }
})