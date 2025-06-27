<script setup lang="ts">
import { useExamplesStore } from '@/stores/examples';

const { currentExample } = useExamplesStore();
</script>

<template>
  <transition name="fade-in">
    <div :key="currentExample?.name">
      <Component
        :is="currentExample?.component"
        v-if="currentExample?.component"
      />
    </div>
  </transition>
</template>

<style>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.2s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
</style>
