<script setup lang="ts">
import { cn } from '@ui/utils';
</script>

<template>
  <h1
    :class="cn(
      'py-4 tracking-tighter text-balance text-4xl max-lg:font-medium sm:text-5xl md:text-7xl xl:text-8xl',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </h1>
</template>
