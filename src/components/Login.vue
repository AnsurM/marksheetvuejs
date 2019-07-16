<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <br />
    <br />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <br />
    <br />
    <button type="button" v-on:click="login()">Login</button>
    <p v-if="this.error">{{this.error}}</p>
    <p v-if='this.loading'>Loading...</p>
    </div>
</template>

<script>
import server from "../server/server";

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
        this.loading = false;
      } 
      else {
        this.loading = true;
        const loggedIn = await server.validateUserLogin({
          email: this.input.username,
          password: this.input.password
        });
        if (loggedIn.name)
        {
            this.loading = false;
            const result = this.$store.dispatch('setLoginData', {isLoggedIn: true, ...loggedIn});
            if(await result === true){
                if(loggedIn.name == 'Administrator') this.$router.push('/admin');
                else this.$router.push('/marksheet');
            }
        }
        else
        {
            this.error = loggedIn;
            this.loading = false;
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
    margin: 200px auto auto auto;
    text-align: center;
    max-width: 600px;
    min-width: 200px;
}

button {
    margin: 10px 0px 20px 0px;
}
</style>