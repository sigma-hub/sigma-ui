<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Loader2Icon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
    role="status"
    data-slot="spinner"
    :aria-label="props.label"
    :class="cn('size-4 animate-spin', $attrs.class ?? '')"
  />
</template>
