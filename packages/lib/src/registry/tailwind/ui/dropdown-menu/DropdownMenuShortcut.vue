<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <span :class="cn('ml-auto text-xs tracking-widest opacity-60', $attrs.class ?? '')">
    <slot />
  </span>
</template>
