<script setup lang="ts">
import { useAttrs } from 'vue';

import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DialogTitleProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-dialog-title"
    :class="[$attrs.class]"
  >
    <slot />
  </DialogTitle>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-dialog-title {
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1;
  }
}
</style>
