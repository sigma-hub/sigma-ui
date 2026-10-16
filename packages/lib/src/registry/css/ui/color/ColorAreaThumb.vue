<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorAreaThumb, type ColorAreaThumbProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorAreaThumbProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorAreaThumb
    data-slot="color-area-thumb"
    class="sigma-ui-color-thumb"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorAreaThumb>
</template>

<style>
.sigma-ui-color-thumb {
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-radius: var(--radius-full);
  background-color: transparent;
  box-shadow: var(--shadow-sm);
}
</style>
