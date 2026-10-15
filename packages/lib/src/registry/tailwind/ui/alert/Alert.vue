<script setup lang="ts">
import { type AlertVariants, alertVariants } from '.';
import { cn } from '@ui/utils';

const props = defineProps<{
  /** Visual style of the alert, such as destructive for errors. */
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
