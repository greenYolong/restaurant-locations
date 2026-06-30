<!-- 
    This file is the list for displaying restaurants 
    Its only role is to display the list of restaurants and their information, it does not handle any logic nor data manipulation
-->

<template>
  <section class="restaurant-list">
    <h2>Restaurants</h2>

    <p v-if="restaurants.length === 0">Aucun restaurant pour le moment.</p>

    <ul v-else>
      <li v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-item">
        <h3>{{ restaurant.name }}</h3>
        <p>{{ restaurant.address }}</p>
        <p>{{ restaurant.latitude }}, {{ restaurant.longitude }}</p>
        <p>{{ restaurant.cuisine_type }}</p>
        <p v-if="restaurant.phone_number">{{ restaurant.phone_number }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Restaurant } from '../types/restaurant';

interface Props {
  restaurants: Restaurant[];
}

defineProps<Props>();
</script>