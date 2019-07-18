<template>
  <div id="login">
    <div id="loginForm">
      <h1>Login</h1>

      <b-form @submit="login" @reset="onReset">
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="input.username"
            required
            placeholder="Enter username here"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password: " label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="input.password"
            required
            placeholder="Enter password here"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Login</b-button>
      </b-form>

      <p v-if="this.error">{{this.error}}</p>
      <p v-if="this.loading">Loading...</p>
    </div>
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
    async login(e) {
      e.preventDefault();
      if (!this.input.username || !this.input.password) {
        this.error = "Invalid login data provided. Please check and try again.";
        this.loading = false;
      } else {
        this.loading = true;
        const loggedIn = await server.validateUserLogin({
          email: this.input.username,
          password: this.input.password
        });
        if (loggedIn.name) {
          this.loading = false;
          const result = this.$store.dispatch("setLoginData", {
            isLoggedIn: true,
            ...loggedIn
          });
          if ((await result) === true) {
            if (loggedIn.name == "Administrator") this.$router.push("/admin");
            else this.$router.push("/marksheet");
          }
        } else {
          this.error = loggedIn;
          this.loading = false;
        }
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.form.rollNo = parseInt(this.form.rollNo);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.input = {
        username: null,
        password: null
      };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>


<style>
#login {
  display: block;
  margin: 200px auto auto auto;
  text-align: center;
  max-width: 600px;
  min-width: 400px;
}

#loginForm {
  display: block;
  font-weight: 500;
  font-size: 20px;
  color: #88176a;
  max-width: 80%;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid green;
  border-radius: 10px;
}

#loginForm > h1 {
  margin: 10px auto 30px auto;
}

button {
  margin: 10px 0px 20px 0px;
}
</style>