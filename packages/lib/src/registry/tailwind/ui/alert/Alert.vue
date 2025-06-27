<script setup lang="ts">
import { type AlertVariants, alertVariants } from '.';
import { cn } from '@ui/utils';

const props = defineProps<{
  variant?: AlertVariants['variant'];
}>();
</script>

<template>
  <div
    :class="cn(alertVariants({ variant }), $attrs.class ?? '')"
    role="alert"
  >
    <slot />
  </div>
</template>
