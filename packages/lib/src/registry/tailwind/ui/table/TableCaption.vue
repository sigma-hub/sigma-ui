<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <caption :class="cn('mt-4 text-sm text-muted-foreground', $attrs.class ?? '')"
  data-slot="table-caption">
    <slot />
  </caption>
</template>
