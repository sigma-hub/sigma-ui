<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <p :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')">
    <slot />
  </p>
</template>
