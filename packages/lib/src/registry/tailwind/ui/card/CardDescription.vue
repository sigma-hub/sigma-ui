<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <p :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  data-slot="card-description">
    <slot />
  </p>
</template>
