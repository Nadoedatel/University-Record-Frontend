<script setup lang="ts">

import {ref} from "vue";
import {UsersProfile} from "@/widgets/UsersProfile";

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
          <h2 class="search-title">Поиск студента</h2>
          <p class="search-description">Введите идентификатор студента для получения информации</p>
        </div>

        <div class="search-input-group">
          <div class="input-wrapper">
            <input
                v-model="usersByID"
                type="text"
                placeholder="Введите ID студента..."
                class="search-input"
                @keypress.enter="setStudent"
            />
            <div class="input-decoration"></div>
          </div>
          <button @click="setStudent" class="search-button">
            <span>Найти</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Student Info Section -->
    <div v-if="studentDate" class="student-section">
      <div class="section-header">
        <h2 class="section-title">Найденный студент</h2>
        <div class="section-actions">
          <button @click="studentDate = null" class="action-button secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2"/>
            </svg>
            Сбросить
          </button>
        </div>
      </div>

      <users-profile :users="studentDate" />
    </div>

    <!-- Features Grid -->
    <div v-else class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M19.4 15C19.2669 15.3017 19.1338 15.6034 19.0007 15.9051C18.5299 16.9255 18.0589 17.9458 17.5881 18.9662C17.281 19.6298 16.974 20.2933 16.6669 20.9569C16.295 21.7631 15.4461 22.2609 14.524 22.2609H9.47598C8.55392 22.2609 7.70498 21.7631 7.33308 20.9569C7.02606 20.2933 6.71904 19.6298 6.41192 18.9662C5.94108 17.9458 5.47015 16.9255 4.99931 15.9051C4.86619 15.6034 4.73308 15.3017 4.59996 15C4.73308 14.6983 4.86619 14.3966 4.99931 14.0949C5.47015 13.0745 5.94108 12.0542 6.41192 11.0338C6.71904 10.3702 7.02606 9.70672 7.33308 9.04312C7.70498 8.23694 8.55392 7.73914 9.47598 7.73914H14.524C15.4461 7.73914 16.295 8.23694 16.6669 9.04312C16.974 9.70672 17.281 10.3702 17.5881 11.0338C18.0589 12.0542 18.5299 13.0745 19.0007 14.0949C19.1338 14.3966 19.2669 14.6983 19.4 15Z"
                    stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>Безопасный доступ</h3>
          <p>Данные защищены современными методами шифрования</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>Актуальные данные</h3>
          <p>Информация обновляется в реальном времени</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 9H21M7 15H11M15 15H17M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                    stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>Подробная статистика</h3>
          <p>Полная информация об успеваемости и рейтинге</p>
        </div>
      </div>
    </div>
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

/* Student Section */
.student-section {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.section-actions {
  display: flex;
  gap: 12px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-button.secondary {
  background: transparent;
}

/* Features Section */
.features-section {
  max-width: 1200px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.feature-card h3 {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
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

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .features-grid {
    grid-template-columns: 1fr;
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