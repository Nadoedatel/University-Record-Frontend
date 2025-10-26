<script setup lang="ts">

const props = defineProps({
  users: Object,
})
</script>

<template>
<pre>{{users}}</pre>
  <div>
    <h1>Name Users</h1>
    <p>{{ users.name }}</p>
    <h2>Last Name</h2>
    <p>{{users.last_name}}</p>
    <h3>Middle Name</h3>
    <p>{{users.middle_name}}</p>
    <h4>faculty</h4>
    <p>{{users.faculty}}</p>
    <h5>Speciallity</h5>
    <p>{{users.speciality}}</p>
    <h1>Enrollment Date</h1>
    <p>{{users.enrollment_date}}</p>
  </div>
</template>

<style scoped>

</style>