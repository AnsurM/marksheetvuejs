<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <br />
    <br />
    <button type="button" v-on:click="login()">Login</button>
    <p v-if="this.error">{{this.error}}</p>
    <p v-if='this.loading'>Loading...</p>
    </div>
</template>

<script>
import server from "../../server/server";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  data() {
    return {
      input: {
        username: null,
        password: null
      },
      error: null,
      loading: false
    };
  },
  methods: {
    async login() {
      if (!this.input.username || !this.input.password) {
        this.error = "Invalid login data provided. Please check and try again.";
      } 
      else {
        this.loading = true;
        const loggedIn = await server.validateUserLogin({
          email: this.input.username,
          password: this.input.password
        });
        if (!loggedIn.name)
        {
            this.error =  "Incorrect login data provided. Please check and try again.";
        }
        else
        {
            this.loading = false;
            const result = this.$store.dispatch('setLoginData', {isLoggedIn: true, ...loggedIn});
            if(await result === true){
                this.$router.push('/marksheet');
            }
        }
      }
    }
  }
};
</script>


<style>
#login {
    border: 2px solid black;
    border-radius: 50px;
    display: block;
    margin: 100px auto auto auto;
    text-align: center;
    max-width: 600px;
    min-width: 200px;
}

button {
    margin: 10px 0px 20px 0px;
}
</style>