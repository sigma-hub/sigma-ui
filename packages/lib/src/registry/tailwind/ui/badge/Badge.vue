<script setup lang="ts">
import { useAttrs } from 'vue';

import { type BadgeVariants, badgeVariants } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<{
  /** Visual style of the badge. */
  variant?: BadgeVariants['variant'];

}>();
</script>

<template>
  <div
    data-slot="badge"
    v-bind="delegatedAttrs()"
    :class="cn(badgeVariants({ variant }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
