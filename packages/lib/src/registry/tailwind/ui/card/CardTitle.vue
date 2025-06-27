<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <h3
    :class="
      cn('text-2xl font-semibold leading-none tracking-tight', $attrs.class ?? '')
    "
  >
    <slot />
  </h3>
</template>
