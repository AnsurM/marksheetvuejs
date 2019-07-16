<template>
    <div id="adminPanel">
  <div id="inputForm">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Student Roll No:" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.rollNo"
          :options="rollNos"
          required
          placeholder="0"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Subject Code:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.subjectCode"
          required
          placeholder="Enter subject code here e.g 'BSCS - 302'"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Theory Marks:" label-for="input-3">
        <b-form-input
          type='number'
          id="input-3"
          v-model="form.theory"
          required
          placeholder="Enter theory marks"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Lab Marks:" label-for="input-4">
        <b-form-input
          type='number'
          id="input-4"
          v-model="form.lab"
          required
          placeholder="Enter lab marks"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
    </div>
</template>

<script>
import server from '../server/server';

  export default {
    data() {
      return {
        form: {
          rollNo: null,
          subjectCode: null,
          theory: null,
          lab: null,
        },
        rollNos: [{text: 'Select One', value: null}, 1, 2, 3, 4],
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    mounted() {
        this.getRollNoList();
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.form.rollNo = parseInt(this.form.rollNo);
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form = {
          rollNo: null,
          subjectCode: null,
          theory: null,
          lab: null,
        }
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      async getRollNoList() {
          const list = await server.getRollNoList();
          this.rollNos = [{
              text: 'Select One',
              value: null
          },
          ...list];
      }
    }
  }
</script>

<style>
#adminPanel {
    display: block;
}

#inputForm {
    display: block;
    max-width: 25%;
    margin: 30px auto;
}
</style>
