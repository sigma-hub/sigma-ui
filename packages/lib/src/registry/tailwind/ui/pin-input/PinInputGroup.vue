<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<PrimitiveProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :class="cn('flex items-center', $attrs.class ?? '')"
  >
    <slot />
  </primitive>
</template>
