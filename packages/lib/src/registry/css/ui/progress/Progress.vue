<script setup lang="ts">
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'reka-ui';

const props = withDefaults(
  defineProps<ProgressRootProps>(),
  {
    modelValue: 0,
  },
);
</script>

<template>
  <ProgressRoot
    v-bind="props"
    class="sigma-ui-progress"
  >
    <ProgressIndicator

      class="sigma-ui-progress__indicator"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>

<style>
.sigma-ui-progress {
  position: relative;
  height: 1rem;
  width: 100%;
  min-width: 50px;
  overflow: hidden;
  border-radius: var(--radius-full);
  background-color: hsl(var(--secondary));
}

.sigma-ui-progress__indicator {
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: hsl(var(--primary));
  transition: all 0.2s ease;
}
</style>
