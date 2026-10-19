<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorAreaThumb, type ColorAreaThumbProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorAreaThumbProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorAreaThumb
    data-slot="color-area-thumb"
    class="sigma-ui-color-thumb"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorAreaThumb>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-color-thumb {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    border: 2px solid white;
    border-radius: var(--radius-full);
    background-color: transparent;
    box-shadow: var(--shadow-sm);
  }
}
</style>
