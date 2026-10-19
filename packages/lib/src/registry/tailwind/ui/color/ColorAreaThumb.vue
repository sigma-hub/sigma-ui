<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorAreaThumb, type ColorAreaThumbProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('size-4 rounded-full border-2 border-white shadow-sm', $attrs.class ?? '')"
  >
    <slot />
  </ColorAreaThumb>
</template>
