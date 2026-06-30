<!--
    This file is the form for filtering restaurants 
    It contains the input fields for filtering by name, cuisine, and location
-->

<template>
  <section class="filters-card">
    <div class="filters-header">
        <div>
            <p class="filter-eyebrow">Recherche avancée</p>
            <h2>Filtres</h2>
        </div>
    </div>

    <div class="filter-grid">
        <div class="field">
        <label for="search">Recherche</label>
        <input
            id="search"
            type="text"
            :value="filters.search"
            @input="onSearchInput"
            placeholder="Nom ou adresse"
        />
        </div>

        <div class="field">
        <label for="cuisine">Cuisine</label>
        <select id="cuisine" :value="filters.cuisine" @change="onCuisineChange">
            <option value="">Toutes les cuisines</option>
            <option>Française</option>
            <option>Italienne</option>
            <option>Asiatique</option>
            <option>Américaine</option>
            <option>Méditerranéenne</option>
            <option>Autre</option>
        </select>
        </div>
    </div>  
  </section>
</template>

<script setup lang="ts">
import type { RestaurantFilters } from '../types/restaurant';

interface Props {
  filters: RestaurantFilters;
}

// Define the props for the component, which includes the filters object containing search and cuisine values
defineProps<Props>();

// Define the emits for the component, which includes events for updating the search and cuisine values
const emit = defineEmits<{
  (e: 'update:search', value: string): void;
  (e: 'update:cuisine', value: string): void;
}>();

// Function to handle the input event for the search field and emit the updated search value
function onSearchInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:search', target.value);
}

// Function to handle the change event for the cuisine select field and emit the updated cuisine value
function onCuisineChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:cuisine', target.value);
}
</script>

<style scoped>
.filters-card {
  background: #fff;
  border: 1px solid #eadfd5;
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 10px 26px rgba(46, 36, 28, 0.06);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.filters-eyebrow {
  margin: 0 0 6px;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8b715d;
}

.filters-header h2 {
  margin: 0;
  color: #2e241c;
  font-size: 1.1rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-weight: 600;
  color: #4b3c31;
  font-size: 0.95rem;
}

.field input,
.field select {
  width: 100%;
  border: 1px solid #dccbbb;
  border-radius: 14px;
  padding: 0.85rem 1rem;
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

@media (max-width: 720px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }
}
</style>