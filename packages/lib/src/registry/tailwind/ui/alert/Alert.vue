<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { type AlertVariants, alertVariants } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<{
  /** Visual style of the alert, such as destructive for errors. */
  variant?: AlertVariants['variant'];
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    :class="cn(alertVariants({ variant }), $attrs.class ?? '')"
    role="alert"
    data-slot="alert"
  >
    <slot />
  </div>
</template>
