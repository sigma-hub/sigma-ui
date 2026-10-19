<script setup lang="ts">
import { useAttrs } from 'vue';

import type { SliderRootEmits, SliderRootProps } from 'reka-ui';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SliderRootProps>();
const emits = defineEmits<SliderRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SliderRoot
    class="sigma-ui-slider"
    data-slot="slider"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
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
@layer base, components;

@layer components {
  .sigma-ui-slider {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 50px;
    align-items: center;
    touch-action: none;
    user-select: none;
  }

  .sigma-ui-slider__track {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: calc(var(--spacing) * 2);
    flex-grow: 1;
    border-radius: var(--radius-full);
    background-color: var(--secondary);
  }

  .sigma-ui-slider__range {
    position: absolute;
    height: 100%;
    background-color: var(--primary);
  }

  .sigma-ui-slider__thumb {
    display: block;
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
    border: 2px solid var(--primary);
    border-radius: var(--radius-full);
    background-color: var(--background);
    transition-duration: 150ms;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sigma-ui-slider__thumb:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }

  .sigma-ui-slider__thumb:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
