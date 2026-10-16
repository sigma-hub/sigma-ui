<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';
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
    class="sigma-ui-pin-input-group"
    data-slot="pin-input-group"
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
