<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <div :class="cn('p-6 pt-0', $attrs.class ?? '')">
    <slot />
  </div>
</template>
