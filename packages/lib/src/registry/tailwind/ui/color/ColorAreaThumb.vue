<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorAreaThumb, type ColorAreaThumbProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('size-4 rounded-full border-2 border-white shadow-sm', $attrs.class ?? '')"
  >
    <slot />
  </ColorAreaThumb>
</template>
