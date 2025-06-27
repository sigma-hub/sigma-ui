<script setup lang="ts">
import { cn } from '@ui/utils';

</script>

<template>
  <div
    :class="
      cn('flex flex-col gap-y-2 text-center sm:text-left', $attrs.class ?? '')
    "
  >
    <slot />
  </div>
</template>
