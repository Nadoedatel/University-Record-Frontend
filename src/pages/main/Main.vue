<script setup lang="ts">

import {MainHeaderMenu} from "@/widgets/MainHeaderMenu";
import Student from "@/pages/student/Student.vue";
import Teacher from "@/pages/teacher/Teacher.vue";
import {ref} from "vue";

const isStudent = ref<boolean>(false);

const setStudent = (value: boolean) => {
  isStudent.value = value;
};
</script>

<template>
  <MainHeaderMenu />
  Who are you?
  <button @click="setStudent(true)">Student</button>
  <button @click="setStudent(false)">Teacher</button>
  <Student v-if="isStudent" />
  <Teacher v-else />
</template>

<style scoped>

</style>