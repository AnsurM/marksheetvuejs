<template>
    <div id='rollNoContainer'>
        <h2>Roll No List</h2>
        <div id="rollNos">
            <b-table striped hover :items="items" v-if="items.length > 0"></b-table>
        </div>
        <b-button variant="warning" @click='onClickGoBack'>Back To Admin Panel</b-button>
    </div>    
</template>

<script>
import server from '../server/server';

export default {

    data() {
        return {
            items: [{name: 'Ansur'}]  
        }
    },
    created(){
        if(!this.$store.getters.getLoginStatus){
            this.$router.push('/');
        }
            this.getRollNoList();
    },
    methods: {
        async getRollNoList() {
            const rollNoList = 
            this.$store.getters.getRollNoList.length 
            ?
            this.$store.getters.getRollNoList
            :
            await server.getUsersInfo();
            rollNoList.forEach(user => {
                if(user.rollno == 0)
                {
                    rollNoList.splice(rollNoList.indexOf(user), 1);
                }
            })
            this.items = await this.$store.dispatch('setRollNoList', rollNoList);
        },
        onClickGoBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        rollNoList() {
            this.items = this.$store.getters.getRollNoList;
        }
    }
}
</script>

<style>
#rollNos {
  display: block;
  max-width: 75%;
  margin: 50px auto 10px auto;
  max-height: 600px;
  border: 2px solid darkolivegreen;
}

#rollNoContainer > h2 {
    margin: 100px auto auto auto;
}
</style>
