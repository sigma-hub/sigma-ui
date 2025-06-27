<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<SliderRootProps>();
const emits = defineEmits<SliderRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SliderRoot
    class="sigma-ui-slider"
    v-bind="forwarded"
  >
    <SliderTrack class="sigma-ui-slider__track">
      <SliderRange class="sigma-ui-slider__range" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="sigma-ui-slider__thumb"
    />
  </SliderRoot>
</template>

<style>
.sigma-ui-slider {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 50px;
  touch-action: none;
  user-select: none;
  align-items: center;
}

.sigma-ui-slider__track {
  position: relative;
  height: 0.5rem;
  width: 100%;
  flex-grow: 1;
  overflow: hidden;
  border-radius: var(--radius-full);
  background-color: hsl(var(--secondary));
}

.sigma-ui-slider__range {
  position: absolute;
  height: 100%;
  background-color: hsl(var(--primary));
}

.sigma-ui-slider__thumb {
  display: block;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: var(--radius-full);
  border: 2px solid hsl(var(--primary));
  background-color: hsl(var(--background));
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-slider__thumb:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
}

.sigma-ui-slider__thumb:disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
