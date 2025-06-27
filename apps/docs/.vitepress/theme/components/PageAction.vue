<script setup lang="ts">
import { cn } from '@ui/utils';
</script>

<template>
  <section
    :class="cn(
      'flex w-full items-center space-x-4 pt-4',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </section>
</template>
