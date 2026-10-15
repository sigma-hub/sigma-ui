<script setup lang="ts">
import { type BadgeVariants, badgeVariants } from '.';
import { cn } from '@ui/utils';

const props = defineProps<{
  /** Visual style of the badge. */
  variant?: BadgeVariants['variant'];

}>();
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), $attrs.class ?? '')"
  data-slot="badge">
    <slot />
  </div>
</template>
