<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <div :class="cn('flex flex-col gap-y-1.5 p-6', $attrs.class ?? '')"
  data-slot="card-header">
    <slot />
  </div>
</template>
