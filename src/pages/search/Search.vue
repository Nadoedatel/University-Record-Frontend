<script setup lang="ts">

import Student from "@/pages/student/Student.vue";
import Teacher from "@/pages/teacher/Teacher.vue";
import {ref} from "vue";
import {fetchStudent} from "@/features/fetchStudents.ts";
import {fetchTeacher} from "@/features/fetchTeacher.ts";

const usersByID = ref<string>();
const userDate = ref<null>();

async function setStudent() {
  try {
    userDate.value = await fetchStudent(undefined, undefined, undefined, usersByID.value)
  } catch (err) {
    console.log(err);
  }
}

async function setTeacher() {
  try {
    userDate.value = await fetchTeacher(undefined, undefined, undefined, usersByID.value)
  } catch (err) {
    console.log(err);
  }
}
defineProps({
  isUser: Boolean,
})
</script>

<template>
  <div class="gradebook-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Электронная зачетная книжка</span>
        </h1>
        <p class="hero-subtitle">Для доступа к вашей успеваемости необходимо идентифицироваться в системе</p>
      </div>
      <div class="hero-decoration">
        <div class="decoration-item"></div>
        <div class="decoration-item"></div>
        <div class="decoration-item"></div>
      </div>
    </div>
    <!-- Search Section -->
    <div class="search-section">
      <div class="search-card">
        <div class="search-header">
          <div class="search-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h2 class="search-title">Поиск {{isUser ? 'студента' : 'преподователя' }}</h2>
          <p class="search-description">Введите идентификатор студента для получения информации</p>
        </div>

        <div class="search-input-group">
          <div class="input-wrapper">
            <input
                v-model="usersByID"
                type="text"
                placeholder="Введите ID студента..."
                class="search-input"
                @keypress.enter="isUser ? setStudent() : setTeacher()"
            />
            <div class="input-decoration"></div>
          </div>
          <button @click="isUser ? setStudent() : setTeacher()" class="search-button">
            <span>Найти</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <Student v-if="isUser" :infoStudent="userDate" />
    <Teacher v-else :infoTeacher="userDate" />
  </div>
</template>

<style scoped>
.gradebook-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 60px 20px 40px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.decoration-item {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.decoration-item:nth-child(1) {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
}

.decoration-item:nth-child(2) {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
}

.decoration-item:nth-child(3) {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
}

/* Search Section */
.search-section {
  max-width: 600px;
  margin: 0 auto 60px;
}

.search-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-header {
  text-align: center;
  margin-bottom: 32px;
}

.search-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.search-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.search-description {
  color: #6b7280;
  margin-bottom: 0;
}

.search-input-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-decoration {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.search-input:focus + .input-decoration {
  width: 100%;
}

.search-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .search-input-group {
    flex-direction: column;
  }

  .search-button {
    width: 100%;
    justify-content: center;
  }
}


@media (max-width: 480px) {
  .gradebook-container {
    padding: 10px;
  }

  .hero-section {
    padding: 40px 10px 20px;
  }

  .search-card {
    padding: 24px;
  }
}
</style>