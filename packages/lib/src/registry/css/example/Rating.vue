<script setup lang="ts">
import { ref } from 'vue';
import { StarIcon } from 'lucide-vue-next';
import { Rating, RatingItem, RatingItemIndicator } from '@ui/registry/css/ui/rating';

const value = ref(3);
</script>

<template>
  <Rating v-model="value">
    <template #default="{ items }">
      <RatingItem
        v-for="item in items"
        :key="item"
        v-slot="{ steps }"
        :item="item"
      >
        <RatingItemIndicator
          v-for="step in steps"
          :key="step"
          :step="step"
        >
          <StarIcon class="sigma-ui-rating-indicator__icon" />
        </RatingItemIndicator>
      </RatingItem>
    </template>
  </Rating>
</template>

<style>
.sigma-ui-rating-indicator__icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
