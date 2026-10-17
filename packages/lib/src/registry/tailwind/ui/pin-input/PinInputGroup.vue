<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<PrimitiveProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('flex items-center', $attrs.class ?? '')"
    data-slot="pin-input-group"
  >
    <slot />
  </primitive>
</template>
