<!-- This file is the main page for the application -->

<template>
  <main class="page-shell">
    <section class="app-card">
        <header class="page-header">
            <div>
                <p class="eyebrow">Restaurant locations</p>
                <h1>Gestion des restaurants</h1>
                <p class="page-subtitle">
                    Consultez la liste, filtrez si nécessaire, puis ajoutez un restaurant en un clic.
                </p>
            </div>
            <div class="header-actions">
          <button class="btn btn-ghost" type="button" @click="showFilters = !showFilters">
            {{ showFilters ? 'Masquer les filtres' : 'Afficher les filtres' }}
          </button>
          <button class="btn btn-primary" type="button" @click="showForm = true">
            Ajouter un restaurant
          </button>
        </div>
        </header>

        <section v-if="showFilters" class="section-block">
            <RestaurantFilters
            v-if="showFilters"
            :filters="filters"
            @update:search="handleSearchUpdate"
            @update:cuisine="handleCuisineUpdate"
            />
        </section>

        <section class="section-block">
            <RestaurantList :restaurants="restaurants"/>
        </section>
    </section>

    <RestaurantForm
    v-if="showForm"
    @submit-restaurant="handleCreateRestaurant"
    @close="showForm = false"
    />
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
const showFilters = ref(false);
const showForm = ref(false);

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
