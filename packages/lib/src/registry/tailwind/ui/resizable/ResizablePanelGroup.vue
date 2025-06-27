<script setup lang="ts">
import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<SplitterGroupProps>();
const emits = defineEmits<SplitterGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterGroup
    v-bind="forwarded"
    :class="cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', $attrs.class ?? '')"
  >
    <slot />
  </SplitterGroup>
</template>
