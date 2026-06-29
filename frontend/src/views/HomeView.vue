<!-- This file is the main page for the application -->

<template>
  <main class="home-view">
    <h1>Gestion des restaurants</h1>

    <!-- Form for adding a new restaurant and listening to the submission event -->
    <RestaurantForm @submit-restaurant="handleCreateRestaurant" />
  </main>
</template>

<script setup lang="ts">
import RestaurantForm from '../components/RestaurantForm.vue';
import { createRestaurant } from '../services/api';
import type { RestaurantPayload } from '../types/restaurant';

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
</script>

<style scoped>
.home-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}
</style>