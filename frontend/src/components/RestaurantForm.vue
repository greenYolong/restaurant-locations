<!-- 
    This file is the form for adding or editing restaurant information 
    It contains the validation rules for the form fields and handles form submission 
-->

<template>
    <div class="modal-backdrop" @click.self="closeModal">
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="restaurant-form-title">
            <div class="modal-header">
                <div>
                <p class="modal-eyebrow">Nouvel établissement</p>
                <h2 id="restaurant-form-title">Ajouter un restaurant</h2>
                </div>

                <button class="icon-button" type="button" @click="closeModal" aria-label="Fermer">
                ×
                </button>
            </div>
            
            <!-- We use .prevent to prevent the default form submission behavior (reloading the page)-->
            <form class="form-grid" @submit.prevent="handleSubmit" novalidate>
                <div class="field">
                    <label for="name">Nom du restaurant</label>
                    <!-- We use v-model as it is the easiest two-way data binding directive in Vue.js -->
                    <!-- We use @input for real-time validation of the field -->
                    <!-- We use @blur for validation when the user leaves the field -->
                    <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    @blur="validateField('name')"  
                    @input="validateField('name')"  
                    />
                    <p v-if="errors.name" class="error">{{ errors.name }}</p>
                </div>

                <div class="field">
                    <label for="address">Adresse</label>
                    <input
                    id="address"
                    v-model="form.address"
                    type="text"
                    @blur="validateField('address')"
                    @input="validateField('address')"
                    />
                    <p v-if="errors.address" class="error">{{ errors.address }}</p>
                </div>

                <div class="field field-half">
                    <label for="latitude">Latitude</label>
                    <input
                    id="latitude"
                    v-model="form.latitude"
                    type="number"
                    step="any"
                    @blur="validateField('latitude')"
                    @input="validateField('latitude')"
                    />
                    <p v-if="errors.latitude" class="error">{{ errors.latitude }}</p>
                </div>

                <div class="field field-half">
                    <label for="longitude">Longitude</label>
                    <input
                    id="longitude"
                    v-model="form.longitude"
                    type="number"
                    step="any"
                    @blur="validateField('longitude')"
                    @input="validateField('longitude')"
                    />
                    <p v-if="errors.longitude" class="error">{{ errors.longitude }}</p>
                </div>

                <div class="field">
                    <label for="cuisine_type">Type de cuisine</label>
                    <select
                    id="cuisine_type"
                    v-model="form.cuisine_type"
                    @blur="validateField('cuisine_type')"
                    @change="validateField('cuisine_type')"
                    >
                    <option disabled value="">Choisir une cuisine</option>
                    <option>Française</option>
                    <option>Italienne</option>
                    <option>Asiatique</option>
                    <option>Américaine</option>
                    <option>Méditerranéenne</option>
                    <option>Autre</option>
                    </select>
                    <p v-if="errors.cuisine_type" class="error">{{ errors.cuisine_type }}</p>
                </div>

                <div class="field">
                    <label for="phone_number">Numéro de téléphone</label>
                    <input
                    id="phone_number"
                    v-model="form.phone_number"
                    type="text"
                    @blur="validateField('phone_number')"
                    @input="validateField('phone_number')"
                    />
                    <p v-if="errors.phone_number" class="error">{{ errors.phone_number }}</p>
                </div>

                <div class="modal-actions">
                    <button class="btn btn-ghost" type="button" @click="closeModal">Annuler</button>
                    <button class="btn btn-primary" type="submit">Ajouter</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from 'vue';
import type { RestaurantErrors, RestaurantFormState, RestaurantField, RestaurantPayload } from '../types/restaurant';

const emit = defineEmits<{
  (e: 'submit-restaurant', payload: RestaurantPayload): void;
  (e: 'close'): void;
}>();

const form = reactive<RestaurantFormState>({
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  cuisine_type: '',
  phone_number: '',
});

const errors = reactive<RestaurantErrors>({
  name: '',
  address: '',
  latitude: '',
  longitude: '',
  cuisine_type: '',
  phone_number: '',
});

const allowedCuisines = [
  'Française',
  'Italienne',
  'Asiatique',
  'Américaine',
  'Méditerranéenne',
  'Autre',
];

// Validates a specific field based on its name and updates the errors object accordingly
function validateField(field: RestaurantField) {
  if (field === 'name') {
    errors.name = form.name.trim().length < 3 ? 'Le nom doit contenir au moins 3 caractères.' : '';
  }

  if (field === 'address') {
    errors.address = form.address.trim().length < 10 ? 'L’adresse doit contenir au moins 10 caractères.' : '';
  }

  if (field === 'latitude') {
    const value = Number(form.latitude);
    if (form.latitude === '' || Number.isNaN(value)) {
      errors.latitude = 'La latitude doit être un nombre.';
    } else if (value < -90 || value > 90) {
      errors.latitude = 'La latitude doit être comprise entre -90 et 90.';
    } else {
      errors.latitude = '';
    }
  }

  if (field === 'longitude') {
    const value = Number(form.longitude);
    if (form.longitude === '' || Number.isNaN(value)) {
      errors.longitude = 'La longitude doit être un nombre.';
    } else if (value < -180 || value > 180) {
      errors.longitude = 'La longitude doit être comprise entre -180 et 180.';
    } else {
      errors.longitude = '';
    }
  }

  if (field === 'cuisine_type') {
    errors.cuisine_type = allowedCuisines.includes(form.cuisine_type)
      ? ''
      : 'Veuillez choisir un type de cuisine valide.';
  }

  if (field === 'phone_number') {
    if (!form.phone_number) {
      errors.phone_number = '';
    } else {
      const phoneRegex = /^[0-9+()\s.-]{6,20}$/;
      errors.phone_number = phoneRegex.test(form.phone_number)
        ? ''
        : 'Le numéro de téléphone n’est pas valide.';
    }
  }
}

// Makes sure all fields are validated before submission
function validateForm() {
  validateField('name');
  validateField('address');
  validateField('latitude');
  validateField('longitude');
  validateField('cuisine_type');
  validateField('phone_number');

  return Object.values(errors).every((error) => error === '');
}

// When the form is submitted, we first validate it and then send the form data to the backend API here (via api.js)
function handleSubmit() {
  if (!validateForm()) return;

  emit('submit-restaurant', {
    name: form.name.trim(),
    address: form.address.trim(),
    latitude: Number(form.latitude),
    longitude: Number(form.longitude),
    cuisine_type: form.cuisine_type,
    phone_number: form.phone_number.trim() || null,
  });
}

function closeModal() {
  emit('close');
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeModal();
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown);
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(46, 36, 28, 0.45);
  backdrop-filter: blur(6px);
}

.modal-card {
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  overflow: auto;
  background: #fff;
  border: 1px solid #eadfd5;
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(46, 36, 28, 0.18);
  padding: 24px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.modal-eyebrow {
  margin: 0 0 6px;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8b715d;
}

.modal-header h2 {
  margin: 0;
  color: #2e241c;
}

.icon-button {
  border: none;
  background: #fbf8f5;
  color: #7b4f2a;
  border-radius: 999px;
  width: 40px;
  height: 40px;
  font-size: 1.4rem;
  cursor: pointer;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-half {
  grid-column: span 1;
}

.field label {
  font-weight: 600;
  color: #4b3c31;
}

.field input,
.field select {
  width: 100%;
  border: 1px solid #dccbbb;
  border-radius: 14px;
  padding: 0.9rem 1rem;
  background: #fff;
  color: #2e241c;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field input:focus,
.field select:focus {
  border-color: #7b4f2a;
  box-shadow: 0 0 0 4px rgba(123, 79, 42, 0.12);
}

.field input::placeholder {
  color: #b7a899;
}

.error {
  margin: 0;
  color: #a4432d;
  font-size: 0.88rem;
}

.modal-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 6px;
}

@media (max-width: 720px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-actions .btn {
    width: 100%;
  }
}
</style>