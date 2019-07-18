<template>
  <div id="adminPanel">
    <div id="resultsHeader">
      <h2>Submit Results</h2>
    </div>
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
            placeholder="Enter subject code here e.g 'BSCS-302'"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Theory Marks:" label-for="input-3">
          <b-form-input
            type="number"
            id="input-3"
            v-model="form.theory"
            required
            placeholder="Enter theory marks"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Lab Marks:" label-for="input-4">
          <b-form-input
            type="number"
            id="input-4"
            v-model="form.lab"
            required
            placeholder="Enter lab marks"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
    <b-button variant="warning" @click="onClickRollNoList">Fetch Roll No List</b-button>
    <br >
    <b-button type="submit" variant="danger" @click="onClickLogOut">Log Out</b-button>
  </div>
</template>

<script>
import server from "../server/server";

export default {
  data() {
    return {
      form: {
        rollNo: null,
        subjectCode: null,
        theory: null,
        lab: null
      },
      rollNos: [{ text: "Select One", value: null }, "Loading options...."],
      show: true
    };
  },
  mounted() {
    this.getRollNoList;
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.form.rollNo = parseInt(this.form.rollNo);
      this.pushResult();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form = {
        rollNo: null,
        subjectCode: null,
        theory: null,
        lab: null
      };
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    async pushResult() {
      let calcTotal =
        parseInt(this.form.theory, 10) + parseInt(this.form.lab, 10);
      let calcGrade = "";
      let calcGP = 0.0;

      calcTotal = parseInt(calcTotal, 10);

      if (calcTotal > 49) {
        if (calcTotal < 53) {
          calcGrade = "D";
          calcGP = 1.0;
        } else if (calcTotal < 57) {
          calcGrade = "D+";
          calcGP = 1.4;
        } else if (calcTotal < 61) {
          calcGrade = "C-";
          calcGP = 1.8;
        } else if (calcTotal <= 63) {
          calcGrade = "C";
          calcGP = 2.0;
        } else if (calcTotal <= 67) {
          calcGrade = "C+";
          calcGP = 2.4;
        } else if (calcTotal <= 70) {
          calcGrade = "B-";
          calcGP = 2.8;
        } else if (calcTotal <= 74) {
          calcGrade = "B";
          calcGP = 3.0;
        } else if (calcTotal < 80) {
          calcGrade = "B+";
          calcGP = 3.4;
        } else if (calcTotal <= 84) {
          calcGrade = "A-";
          calcGP = 3.8;
        } else if (calcTotal <= 89) {
          calcGrade = "A";
          calcGP = 4.0;
        } else if (calcTotal >= 90) {
          calcGrade = "A+";
          calcGP = 4.0;
        }
      } else {
        calcGrade = "FAILS";
        calcGP = 0.0;
      }

      let result = {
        rollno: this.form.rollNo,
        subcode: this.form.subjectCode,
        theory: this.form.theory,
        lab: this.form.lab,
        total: calcTotal,
        grade: calcGrade,
        gp: calcGP
      };

      console.log("Uploading result", result);
      const uploadStatus = await server.uploadResult(result);
      console.log("upload Result: ", uploadStatus);

      //   total: this.state.total,
      //   grade: this.state.grade,
      //   gp: this.state.gp
    },
    onClickRollNoList() {
      this.$router.push("/admin/rollNoList");
    },
    onClickLogOut() {
      this.$store.dispatch('logOut');
      this.$router.push('/');
    }
  },
  computed: {
    async getRollNoList() {
        const list = await server.getRollNoList();
        this.rollNos = [
          {
            text: "Select One",
            value: null
          },
          ...list
        ];
    }
  }
};
</script>

<style>
#adminPanel {
  display: block;
}

#resultsHeader {
  display: block;
  margin: 50px auto;
}

#inputForm {
  display: block;
  font-weight: 500;
  font-size: 20px;
  color: #88176a;
  max-width: 25%;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid green;
  border-radius: 10px;
}
</style>
