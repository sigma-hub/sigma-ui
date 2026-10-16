<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { CSSProperties } from 'vue';
import { ColorAreaRoot, type ColorAreaRootEmits, type ColorAreaRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('relative h-40 w-full', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </ColorAreaRoot>
</template>
