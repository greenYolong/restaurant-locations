<!-- 
    This file is the list for displaying restaurants 
    Its only role is to display the list of restaurants and their information, it does not handle any logic nor data manipulation
-->

<template>
  <section class="list-section">
    <div class="list-header">
      <h2>Restaurants</h2>
      <p>{{ restaurants.length }} établissement(s)</p>
    </div>

    <div v-if="restaurants.length === 0" class="empty-state">
      Aucun restaurant pour le moment.
    </div>

    <div v-else class="restaurant-grid">
      <article v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <div class="restaurant-top">
          <h3>{{ restaurant.name }}</h3>
          <span class="cuisine-badge">
            <span class="cuisine-emoji" aria-hidden="true">
            {{ getCuisineEmoji(restaurant.cuisine_type) }}
            </span>
            <span>{{ restaurant.cuisine_type }}</span>
          </span>
        </div>

        <div class="info-list">
            <div class="info-row">
            <span class="info-icon" aria-hidden="true">📍 </span>
            <span>{{ restaurant.address }}</span>
            </div>

            <div class="info-row">
            <span class="info-icon" aria-hidden="true">🌐 </span>
            <span>{{ restaurant.latitude }}, {{ restaurant.longitude }}</span>
            </div>

            <div class="info-row">
            <span class="info-icon" aria-hidden="true">📞 </span>
            <span>{{ restaurant.phone_number || 'Non renseigné' }}</span>
            </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Restaurant } from '../types/restaurant';

interface Props {
  restaurants: Restaurant[];
}

defineProps<Props>();

const cuisineEmojis: Record<string, string> = {
  Française: '🥖',
  Italienne: '🍝',
  Asiatique: '🍜',
  Américaine: '🍔',
  Méditerranéenne: '🫒',
  Autre: '🍽️',
};

function getCuisineEmoji(cuisine: string): string {
  return cuisineEmojis[cuisine] || '🍽️';
}
</script>

<style scoped>
.list-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-header h2 {
  margin: 0;
  color: #2e241c;
}

.list-header p {
  margin: 6px 0 0;
  color: #7a6a5d;
}

.empty-state {
  padding: 20px;
  border: 1px dashed #d9c8bb;
  border-radius: 18px;
  background: #fbf8f5;
  color: #7a6a5d;
}

.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 18px;
}

.restaurant-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  border: 1px solid #eadfd5;
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 10px 26px rgba(46, 36, 28, 0.06);
}

.restaurant-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.restaurant-top h3 {
  margin: 0;
  font-size: 1.08rem;
  color: #2e241c;
}

.cuisine-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  background: #f4e8dd;
  color: #7b4f2a;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.cuisine-emoji {
  font-size: 1rem;
  line-height: 1;
}

@media (max-width: 560px) {
  .restaurant-top {
    flex-direction: column;
  }
}
</style>