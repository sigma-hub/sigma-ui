<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

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
    role="status"
    data-slot="spinner"
    :aria-label="props.label"
    :class="cn('size-4 animate-spin', $attrs.class ?? '')"
  />
</template>
