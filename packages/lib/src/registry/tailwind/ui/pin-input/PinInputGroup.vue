<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<PrimitiveProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('flex items-center', $attrs.class ?? '')"
    data-slot="pin-input-group"
  >
    <slot />
  </primitive>
</template>
