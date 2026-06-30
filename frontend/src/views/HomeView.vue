<!-- This file is the main page for the application -->

<template>
  <main class="home-view">
    <h1>Gestion des restaurants</h1>

    <!-- Form for adding a new restaurant and listening to the submission event -->
    <RestaurantForm @submit-restaurant="handleCreateRestaurant" />

    <RestaurantFilters
      :filters="filters"
      @update:search="handleSearchUpdate"
      @update:cuisine="handleCuisineUpdate"
    />

    <RestaurantList :restaurants="restaurants" />
  </main>
</template>

<script setup lang="ts">
import RestaurantForm from '../components/RestaurantForm.vue';
import RestaurantFilters from '../components/RestaurantFilters.vue';
import RestaurantList from '../components/RestaurantList.vue';
import { createRestaurant, filterRestaurants, getRestaurants, searchRestaurants } from '../services/api';
import { onMounted, reactive, ref } from 'vue';
import type { Restaurant, RestaurantFilters as FiltersState, RestaurantPayload } from '../types/restaurant';

const restaurants = ref<Restaurant[]>([]);
const filters = reactive<FiltersState>({
  search: '',
  cuisine: '',
});

async function loadRestaurants() {
  restaurants.value = await getRestaurants();
}

// Function to handle the creation of a new restaurant by calling the API service
async function handleCreateRestaurant(payload: RestaurantPayload) {
  try {
    const createdRestaurant = await createRestaurant(payload);
    console.log('Restaurant créé :', createdRestaurant);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('Erreur API :', message);
  }
}

async function handleSearchUpdate(value: string) {
  filters.search = value;

  if (filters.search.trim() && filters.cuisine.trim()) {
    restaurants.value = await searchRestaurants(filters.search);
    return;
  }

  if (filters.search.trim()) {
    restaurants.value = await searchRestaurants(filters.search);
    return;
  }

  if (filters.cuisine.trim()) {
    restaurants.value = await filterRestaurants(filters.cuisine);
    return;
  }

  await loadRestaurants();
}

async function handleCuisineUpdate(value: string) {
  filters.cuisine = value;

  if (filters.search.trim()) {
    restaurants.value = await searchRestaurants(filters.search);
    return;
  }

  if (filters.cuisine.trim()) {
    restaurants.value = await filterRestaurants(filters.cuisine);
    return;
  }

  await loadRestaurants();
}

onMounted(loadRestaurants);
</script>

<style scoped>
.home-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}
</style>