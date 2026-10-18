<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
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
    data-slot="pin-input-group"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-pin-input-group"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-pin-input-group {
  display: flex;
  align-items: center;
}
</style>
