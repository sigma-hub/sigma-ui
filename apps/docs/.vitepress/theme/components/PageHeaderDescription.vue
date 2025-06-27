<script setup lang="ts">
import { cn } from '@ui/utils';
</script>

<template>
  <div :class="cn('max-w-(--breakpoint-lg) text-md/8 lg:text-xl/9 font-medium text-gray-600 dark:text-gray-300', $attrs.class ?? '')">
    <slot />
  </div>
</template>
