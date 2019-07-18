<template>
  <div id="marksheetContainer">
    <div id="userDetails">
      <h2>{{this.getUserDetails.name}}</h2>
      <h2>Marksheet</h2>
      <button id='logoutButton' @click='this.logOutUser' >Log Out</button>
    </div>
    <div id="marksheetsHolder">
    <div v-if="!this.items">
      <h2>Getting data....</h2>
    </div>
    <div v-else class="marksheet" v-for="(item,index) in items" :key="index">
          <hr >
          <h4>Semester {{index + 1}}</h4>
          <b-table striped hover :items="item" v-if="item.length"></b-table>
    </div>
    </div>
  </div>
</template>

<script>
import server from "../server/server";

export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [],
      items: false
    };
  },
  created() {
    // if (!this.checkLogin()) {
    //   console.log("User not signed in... redirecting to login!");
    //   this.$router.push("/");
    // }
    this.getUserMarks;
    this.setDisplayItems;
  },
  methods: {
    checkLogin() {
      return this.$store.getters.getLoginStatus;
    },
    logOutUser() {
      this.$store.dispatch('logOut');
      this.$router.push('/');
    }
  },
  computed: {
    getUserDetails() {
      return this.$store.getters.getUserDetails;
    },
    async getUserMarks() {
      let rollNo = {
        rollNo: this.$store.getters.getUserDetails.rollno
      };
      let results = await server.getUsersResults(rollNo);
      this.$store.dispatch("setResults", results);
      this.items = this.$store.getters.getResults;
      this.setDisplayItems;
    },
    setDisplayItems() {

      if(Array.isArray(this.items))
      {
      let myResults = [...this.items];
      let sortedResults = [];

      let sem1 = [];
      let sem2 = [];
      let sem3 = [];
      let sem4 = [];
      let sem5 = [];
      let sem6 = [];
      let sem7 = [];
      let sem8 = [];

      myResults.forEach(result => {

        switch (result.semester) {
          case 1: {
            sem1.push(result);
            break;
          }
          case 2: {
            sem2.push(result);
            break;
          }
          case 3: {
            sem3.push(result);
            break;
          }
          case 4: {
            sem4.push(result);
            break;
          }
          case 5: {
            sem5.push(result);
            break;
          }
          case 6: {
            sem6.push(result);
            break;
          }
          case 7: {
            sem7.push(result);
            break;
          }
          case 8: {
            sem8.push(result);
            break;
          }
          default: {
            break;
          }
        }
      });
        sem1.length > 0 ? sortedResults.push(sem1) : [];
        sem2.length > 0 ? sortedResults.push(sem2) : [];
        sem3.length > 0 ? sortedResults.push(sem3) : [];
        sem4.length > 0 ? sortedResults.push(sem4) : [];
        sem5.length > 0 ? sortedResults.push(sem5) : [];
        sem6.length > 0 ? sortedResults.push(sem6) : [];
        sem7.length > 0 ? sortedResults.push(sem7) : [];
        sem8.length > 0 ? sortedResults.push(sem8) : [];

        // console.log("Sorted results are: ", sortedResults);
        this.items = sortedResults.length > 0 ? sortedResults : [];
      }
      else
      {
        this.items = false;
      }
    }
  }
};
</script>


<style scoped>

#marksheetContainer {
  display: block;
  margin: 100px auto;
  max-width: 70%;
  min-width: 50%;
}

#marksheetsHolder {
  margin: 50px auto;
  max-height: 550px;
  overflow-y: scroll; 
}

.marksheet {
  /* border: 2px solid black; */
  margin: 30px auto;
}

.marksheet > h4 {
  margin: 10px 0px;
}

hr {
width: 80%;
height: 2px;
margin-left: auto;
margin-right: auto;
background-color:#666;
border: 0 none;
margin-top: 50px;
margin-bottom:20px;
}
</style>