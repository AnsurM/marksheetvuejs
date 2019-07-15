<template>
  <div>
      <h1>User marksheet here</h1>
  </div>
</template>

<script>
export default {    
    created() {
        if(!this.checkLogin()){
            console.log("User not signed in... redirecting to login!");
            this.$router.push('/');
        }        
    },
    methods: {
        checkLogin() {
            return this.$store.getters.getLoginStatus;
        }
    }
};
</script>
