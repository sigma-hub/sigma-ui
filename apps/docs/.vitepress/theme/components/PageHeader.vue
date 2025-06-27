<script setup lang="ts">
import { cn } from '@ui/utils';
</script>

<template>
  <section
    :class="cn(
      'flex flex-col gap-2 py-8 md:py-20 lg:pt-24 lg:pb-24',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </section>
</template>
