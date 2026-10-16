<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorSliderRoot, type ColorSliderRootEmits, type ColorSliderRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorSliderRootProps>();
const emits = defineEmits<ColorSliderRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorSliderRoot
    data-slot="color-slider"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('relative flex w-full touch-none select-none items-center', $attrs.class ?? '')"
  >
    <slot />
  </ColorSliderRoot>
</template>
