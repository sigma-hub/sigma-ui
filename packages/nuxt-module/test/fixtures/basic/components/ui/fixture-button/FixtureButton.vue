<script setup lang="ts">
import { cn } from '@/lib/utils';
import { fixtureButtonVariants } from '.';
</script>

<template>
  <button
    type="button"
    :class="cn(fixtureButtonVariants.base, 'fixture-button--ssr')"
  >
    <slot />
  </button>
</template>
