<script setup lang="ts">
import { useAttrs } from 'vue';

import { Loader2Icon } from '@lucide/vue';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface SpinnerProps {
  /**
   * Accessible name announced while the spinner is visible.
   */
  label?: string;
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  label: 'Loading',
});
</script>

<template>
  <Loader2Icon
    data-slot="spinner"
    v-bind="delegatedAttrs()"
    role="status"
    :aria-label="props.label"
    :class="cn('size-4 animate-spin', $attrs.class ?? '')"
  />
</template>
