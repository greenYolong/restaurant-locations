<!--
    This file is the form for filtering restaurants 
    It contains the input fields for filtering by name, cuisine, and location
-->

<template>
  <section class="restaurant-filters">
    <h2>Filtres</h2>

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