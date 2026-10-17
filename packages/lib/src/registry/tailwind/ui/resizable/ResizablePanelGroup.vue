<script setup lang="ts">
import { useAttrs } from 'vue';

import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SplitterGroupProps>();
const emits = defineEmits<SplitterGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterGroup
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', $attrs.class ?? '')"
    data-slot="resizable-panel-group"
  >
    <slot />
  </SplitterGroup>
</template>
