<script setup lang="ts">
import {
  Button,
  Accordion,
  CardLightbox,
} from '@/components/test';
</script>

<template>
  <main class="playground-css">
    <Button />
    <Accordion />
    <CardLightbox />
  </main>
</template>

<style>
.playground-css {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 768px;
  gap: 96px;
}

.playground-css h1 {
  font-size: 24px;
  line-height: 1.3;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}
</style>
