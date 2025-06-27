<script lang="ts" setup>
import { cn } from '@ui/utils';
</script>

<template>
  <div :class="cn('grid gap-1.5 p-4 text-center sm:text-left', $attrs.class ?? '')">
    <slot />
  </div>
</template>
