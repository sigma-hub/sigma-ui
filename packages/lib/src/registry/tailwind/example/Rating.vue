<script setup lang="ts">
import { ref } from 'vue';
import { StarIcon } from '@lucide/vue';
import { Rating, RatingItem, RatingItemIndicator } from '@ui/registry/tailwind/ui/rating';

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
          <StarIcon class="size-5" />
        </RatingItemIndicator>
      </RatingItem>
    </template>
  </Rating>
</template>
