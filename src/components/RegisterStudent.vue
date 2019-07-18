<template>
  <div>
    <div id="registerForm">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-2" label="Student Name:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name here"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email here"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password here"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Register</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        <br />
        <b-button variant="warning" @click="onClickGoBack">Back To Admin Panel</b-button>

        <p v-show="this.loading">{{this.loading}}</p>
        <p v-show="this.resultStatus">{{this.result}}</p>
      </b-form>
    </div>
  </div>
</template>

<script>
import server from "../server/server";

export default {
  data() {
    return {
      form: {
        email: null,
        name: null,
        password: null
      },
      resultStatus: null,
      loadingStatus: null
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.loadingStatus = "Loading....";
      this.resultStatus = null;
      this.resultStatus = await server.registerNewStudent(this.form);
      if (this.resultStatus) {
        this.loadingStatus = null;
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form = {
        email: null,
        name: null,
        password: null
      };
      this.loadingStatus = null;
      this.resultStatus = null;
    },
    onClickGoBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    loading() {
      return this.loadingStatus;
    },
    result() {
      return this.resultStatus;
    }
  }
};
</script>

<style>
#registerForm {
  display: block;
  font-size: 20px;
  color: #88176a;
  max-width: 25%;
  margin: 100px auto;
  padding: 20px;
  border: 2px solid green;
  border-radius: 10px;
}
</style>
