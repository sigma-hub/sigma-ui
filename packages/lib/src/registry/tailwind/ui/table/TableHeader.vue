<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <thead :class="cn('[&_tr]:border-b', $attrs.class ?? '')">
    <slot />
  </thead>
</template>
