<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
import { DotIcon } from 'lucide-vue-next';

const props = defineProps<PrimitiveProps>();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive v-bind="forwardedProps">
    <slot>
      <DotIcon class="w-4 h-4 text-muted-foreground" />
    </slot>
  </primitive>
</template>
