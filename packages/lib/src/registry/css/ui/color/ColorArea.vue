<script setup lang="ts">
import { useAttrs } from 'vue';

import type { CSSProperties } from 'vue';
import { ColorAreaRoot, type ColorAreaRootEmits, type ColorAreaRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorAreaRootProps>();
const emits = defineEmits<ColorAreaRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * The color surface. Receives the gradient style for the area.
   */
  default?: (props: { style: CSSProperties }) => unknown;
}>();
</script>

<template>
  <ColorAreaRoot
    v-slot="slotProps"
    data-slot="color-area"
    class="sigma-ui-color-area"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </ColorAreaRoot>
</template>

<style>
.sigma-ui-color-area {
  position: relative;
  width: 100%;
  height: 10rem;
}
</style>
