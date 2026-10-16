<script setup lang="ts">
import { ColorAreaArea, type ColorAreaAreaProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorAreaAreaProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorAreaArea
    data-slot="color-area-area"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('relative size-full rounded-md', $attrs.class ?? '')"
  >
    <slot />
  </ColorAreaArea>
</template>
