<script setup lang="ts">
import {ref} from "vue";
import {UsersProfile} from "@/widgets/UsersProfile";

const name = ref<string>();
const lastName = ref<string>();
const middleName = ref<string>();
const teacherData = ref<any>(null);
const isExam = ref<boolean | null>(null);
const groups = ref<string[]>([]);
const studentsDate = ref<any[]>([]);
const selectedGroup = ref<string>('');
const studentGrades = ref<{[key: number]: number | string}>({});

const setExam = (value: boolean) => {
  isExam.value = value;
  getGroup();
};

function setStudentGrade(studentId: number, grade: number | string) {
  studentGrades.value[studentId] = grade;
}

function handleExamGradeChange(studentId: number, event: Event) {
  const target = event.target as HTMLSelectElement;
  if (target) {
    setStudentGrade(studentId, parseInt(target.value));
  }
}

function handleTestGradeChange(studentId: number, event: Event) {
  const target = event.target as HTMLSelectElement;
  if (target) {
    setStudentGrade(studentId, target.value);
  }
}

function goBackToGroups() {
  studentsDate.value = [];
  selectedGroup.value = '';
}

function resetAll() {
  teacherData.value = null;
  groups.value = [];
  studentsDate.value = [];
  selectedGroup.value = '';
  isExam.value = null;
  studentGrades.value = {};
}

defineProps({
  infoTeacher: Object,
})
</script>

<template>
  <div class="gradebook-container">
    <!-- Teacher Info Section -->
    <div v-if="infoTeacher" class="teacher-section">
      <div class="section-header">
        <h2 class="section-title">Найденный преподаватель</h2>
        <div class="section-actions">
          <button @click="resetAll" class="action-button secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2"/>
            </svg>
            Сбросить
          </button>
          <button v-if="isExam !== null" @click="getGroup" class="action-button primary">
            Получить группы
          </button>
        </div>
      </div>

      <div class="container-date__info">
        <!-- Teacher Profile -->
        <div class="teacher-profile-section">
          <users-profile :users="infoTeacher" />

          <!-- Type Selection Modal -->
          <div v-if="isExam === null" class="type-selection-modal">
            <div class="modal-content">
              <h3>Выберите тип оценки</h3>
              <div class="type-buttons">
                <button @click="setExam(true)" class="type-button exam">
                  <div class="type-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <span>Экзамен</span>
                  <small>Оценка от 0 до 10</small>
                </button>
                <button @click="setExam(false)" class="type-button test">
                  <div class="type-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <span>Зачет</span>
                  <small>Зачет/Незачет</small>
                </button>
              </div>
            </div>
          </div>

          <!-- Current Type Badge -->
          <div v-else class="current-type-badge">
            <div class="badge" :class="isExam ? 'exam' : 'test'">
              <span>{{ isExam ? 'Экзамен' : 'Зачет' }}</span>
              <button @click="isExam = null" class="change-type-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Groups and Students Section -->
        <div class="content-section">
          <!-- Groups List -->
          <div v-if="groups && groups.length > 0 && studentsDate.length === 0" class="groups-container">
            <div class="section-header">
              <h3 class="section-subtitle">Выберите группу</h3>
              <span class="groups-count">{{ groups.length }} групп</span>
            </div>
            <div class="groups-grid">
              <div
                  v-for="group in groups"
                  :key="group"
                  class="group-card"
                  @click="getStudentByGroup(group)"
              >
                <div class="group-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.3431 15.6569 16 14 16H10C8.34315 16 7 17.3431 7 19V21" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <span class="group-name">{{ group }}</span>
                <div class="group-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Students List -->
          <div v-if="studentsDate && studentsDate.length > 0" class="students-container">
            <div class="students-header">
              <div>
                <h3 class="section-subtitle">Студенты группы {{ selectedGroup }}</h3>
                <p class="students-count">{{ studentsDate.length }} студентов</p>
              </div>
              <button @click="goBackToGroups" class="back-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Назад к группам
              </button>
            </div>

            <div class="students-list">
              <div v-for="student in studentsDate" :key="student.id" class="student-card">
                <div class="student-info">
                  <div class="student-name">
                    {{ student.last_name || '' }} {{ student.name || '' }} {{ student.middle_name || '' }}
                  </div>
                  <div class="student-details">
                    <span class="faculty">{{ student.faculty || '' }}</span>
                    <span class="speciality">{{ student.speciality || '' }}</span>
                  </div>
                </div>

                <div class="grade-section">
                  <div class="grade-selector">
                    <label>Оценка:</label>
                    <select
                        v-if="isExam"
                        :value="studentGrades[student.id]"
                        @change="handleExamGradeChange(student.id, $event)"
                        class="grade-select"
                    >
                      <option v-for="n in 11" :key="n" :value="n-1">{{ n-1 }}</option>
                    </select>
                    <select
                        v-else
                        :value="studentGrades[student.id]"
                        @change="handleTestGradeChange(student.id, $event)"
                        class="grade-select"
                    >
                      <option value="зачет">Зачет</option>
                      <option value="незачет">Незачет</option>
                    </select>
                  </div>

                  <button
                      @click="postGradeStudent(student.id, student.name)"
                      class="add-grade-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Добавить оценку
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="(!groups || groups.length === 0) && studentsDate.length === 0 && isExam !== null" class="empty-state">
            <div class="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Нажмите "Получить группы"</h3>
            <p>Для отображения списка доступных групп</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div v-else class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M17 21V19C17 17.3431 15.6569 16 14 16H10C8.34315 16 7 17.3431 7 19V21"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M8 5V3C8 1.89543 8.89543 1 10 1H14C15.1046 1 16 1.89543 16 3V5"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M21 12L19 12"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M5 12L3 12"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M18.364 5.63604L16.95 7.05005"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M7.05029 7.05005L5.63628 5.63604"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M18.364 18.364L16.95 16.95"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M7.05029 16.95L5.63628 18.364"
                    stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>Профессиональные данные</h3>
          <p>Полная информация о квалификации и специализации</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor" stroke-width="2"/>
              <path d="M19.4 15C19.2669 15.3017 19.1338 15.6034 19.0007 15.9051C18.5299 16.9255 18.0589 17.9458 17.5881 18.9662C17.281 19.6298 16.974 20.2933 16.6669 20.9569C16.295 21.7631 15.4461 22.2609 14.524 22.2609H9.47598C8.55392 22.2609 7.70498 21.7631 7.33308 20.9569C7.02606 20.2933 6.71904 19.6298 6.41192 18.9662C5.94108 17.9458 5.47015 16.9255 4.99931 15.9051C4.86619 15.6034 4.73308 15.3017 4.59996 15C4.73308 14.6983 4.86619 14.3966 4.99931 14.0949C5.47015 13.0745 5.94108 12.0542 6.41192 11.0338C6.71904 10.3702 7.02606 9.70672 7.33308 9.04312C7.70498 8.23694 8.55392 7.73914 9.47598 7.73914H14.524C15.4461 7.73914 16.295 8.23694 16.6669 9.04312C16.974 9.70672 17.281 10.3702 17.5881 11.0338C18.0589 12.0542 18.5299 13.0745 19.0007 14.0949C19.1338 14.3966 19.2669 14.6983 19.4 15Z"
                    stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>Академическая информация</h3>
          <p>Ученая степень, кафедра и преподавательский стаж</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>Проверенные данные</h3>
          <p>Вся информация проходит регулярную проверку и актуализацию</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-date__info {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 32px;
  align-items: start;
}

.teacher-profile-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

/* Type Selection Modal */
.type-selection-modal {
  margin-top: 20px;
}

.modal-content {
  text-align: center;
}

.modal-content h3 {
  color: white;
  margin-bottom: 20px;
  font-size: 1.25rem;
}

.type-buttons {
  display: grid;
  gap: 12px;
}

.type-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.type-button.exam {
  border-color: #ff6b6b;
}

.type-button.test {
  border-color: #51cf66;
}

.type-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-button small {
  opacity: 0.8;
  font-size: 0.75rem;
}

/* Current Type Badge */
.current-type-badge {
  margin-top: 16px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
}

.badge.exam {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
}

.badge.test {
  background: linear-gradient(135deg, #51cf66, #40c057);
  color: white;
}

.change-type-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.change-type-btn:hover {
  opacity: 1;
}

/* Content Section */
.content-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 400px;
}

.section-subtitle {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.groups-count,
.students-count {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

/* Groups Grid */
.groups-grid {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.group-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.group-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.group-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.group-name {
  color: white;
  font-weight: 600;
  flex: 1;
}

.group-arrow {
  color: rgba(255, 255, 255, 0.6);
}

/* Students Section */
.students-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.students-list {
  display: grid;
  gap: 16px;
}

.student-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.student-card:hover {
  background: rgba(255, 255, 255, 0.15);
}

.student-info {
  color: white;
  flex: 1;
}

.student-name {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.student-details {
  display: flex;
  gap: 12px;
  font-size: 0.875rem;
}

.faculty,
.speciality {
  color: rgba(255, 255, 255, 0.8);
}

.grade-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.grade-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
}

.grade-select {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  min-width: 80px;
}

.grade-select option {
  background: #2d3748;
  color: white;
}

.add-grade-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.add-grade-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.empty-state h3 {
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.action-button.primary {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Responsive */
@media (max-width: 968px) {
  .container-date__info {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .student-card {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .grade-section {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .students-header {
    flex-direction: column;
    gap: 12px;
  }

  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}

/* Стили такие же как у студенческого компонента */
.gradebook-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.search-input:focus + .input-decoration {
  width: 100%;
}

/* Teacher Section */
.teacher-section {
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

}
</style>