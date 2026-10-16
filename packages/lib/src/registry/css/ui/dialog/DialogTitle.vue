<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DialogTitleProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogTitle
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    class="sigma-ui-dialog-title"
    data-slot="dialog-title"
    :class="[$attrs.class]"
  >
    <slot />
  </DialogTitle>
</template>

<style>
.sigma-ui-dialog-title {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1;
}
</style>
