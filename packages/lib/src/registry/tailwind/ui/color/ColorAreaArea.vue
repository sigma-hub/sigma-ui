<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorAreaArea, type ColorAreaAreaProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorAreaAreaProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorAreaArea
    data-slot="color-area-area"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('relative size-full rounded-md', $attrs.class ?? '')"
  >
    <slot />
  </ColorAreaArea>
</template>
