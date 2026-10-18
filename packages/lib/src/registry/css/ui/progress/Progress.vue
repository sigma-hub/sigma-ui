<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(
  defineProps<ProgressRootProps>(),
  {
    modelValue: 0,
  },
);
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-progress"
    :class="[$attrs.class]"
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
  overflow: hidden;
  width: 100%;
  min-width: 50px;
  height: calc(var(--spacing) * 4);
  border-radius: var(--radius-full);
  background-color: var(--secondary);
}

.sigma-ui-progress__indicator {
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: var(--primary);
  transition: all 0.2s ease;
}
</style>
