<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <div :class="cn('flex items-center p-6 pt-0', $attrs.class ?? '')"
  data-slot="card-footer">
    <slot />
  </div>
</template>
