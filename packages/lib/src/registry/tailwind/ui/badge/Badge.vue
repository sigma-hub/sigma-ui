<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { type BadgeVariants, badgeVariants } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<{
  /** Visual style of the badge. */
  variant?: BadgeVariants['variant'];

}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    :class="cn(badgeVariants({ variant }), $attrs.class ?? '')"
    data-slot="badge"
  >
    <slot />
  </div>
</template>
