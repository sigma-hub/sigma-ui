<script setup lang="ts">
import {
  Button,
  Accordion,
  CardLightbox,
} from '@/components/test';
</script>

<template>
  <main class="flex flex-col gap-24 max-w-[768px] mx-auto [&_h1]:text-2xl [&_h1]:pb-2 [&_h1]:mb-4! [&_h1]:border-b [&_h1]:border-gray-200">
    <Button />
    <Accordion />
    <CardLightbox />
  </main>
</template>
