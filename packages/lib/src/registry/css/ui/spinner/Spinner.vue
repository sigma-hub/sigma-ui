<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next';

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
    class="sigma-ui-spinner"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-spinner {
  width: 1rem;
  height: 1rem;
  animation: sigma-ui-spin 1s linear infinite;
}

@keyframes sigma-ui-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
