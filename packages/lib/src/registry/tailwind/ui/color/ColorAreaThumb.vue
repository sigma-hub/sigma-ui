<script setup lang="ts">
import { ColorAreaThumb, type ColorAreaThumbProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorAreaThumbProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorAreaThumb
    data-slot="color-area-thumb"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('size-4 rounded-full border-2 border-white shadow-sm', $attrs.class ?? '')"
  >
    <slot />
  </ColorAreaThumb>
</template>
