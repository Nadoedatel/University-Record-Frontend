<script setup lang="ts">

import {ref} from "vue";

const name = ref<string>();
const lastName = ref<string>();
const middleName = ref<string>();
const studentDate = ref<null>();
const usersByID = ref<string>();

async function setStudent() {
  try {
    let url: string;
    if (name.value && lastName.value && middleName.value) {
      url = `http://localhost:8080/api/students/search?name=${name.value}&last_name=${lastName.value}&middle_name=${middleName.value}`;
    } else {
      url = `http://localhost:8080/api/students/${usersByID.value}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    studentDate.value = data;
    console.log("Student data:", data);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <h1>If u'r a student, u nust enter ur name, lastname, middlename</h1>
  <div>
    <input v-model="name" type="text" placeholder="Name" />
    <input v-model="lastName" type="text" placeholder="Lastname" />
    <input v-model="middleName" type="text" placeholder="Middlename" />
    <p>Get Users in ID</p>
    <input v-model="usersByID" type="text" placeholder="Users by ID" />
  </div>
  <div>
    <h2>Info Student</h2>
<!--    <p><strong>Name:</strong> {{ name }}</p>-->
<!--    <p><strong>Last Name:</strong> {{ lastName }}</p>-->
<!--    <p><strong>Middle Name:</strong> {{ middleName }}</p>-->
    <button @click="setStudent">OK!</button>
  </div>
  <div v-if="studentDate">
    <h3>Found Student:</h3>
    <pre>{{ studentDate }}</pre>
  </div>
</template>

<style scoped>

</style>