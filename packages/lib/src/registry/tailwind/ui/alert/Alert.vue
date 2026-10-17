<script setup lang="ts">
import { useAttrs } from 'vue';

import { type AlertVariants, alertVariants } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<{
  /** Visual style of the alert, such as destructive for errors. */
  variant?: AlertVariants['variant'];
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    :class="cn(alertVariants({ variant }), $attrs.class ?? '')"
    role="alert"
    data-slot="alert"
  >
    <slot />
  </div>
</template>
