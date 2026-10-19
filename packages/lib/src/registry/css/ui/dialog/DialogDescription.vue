<script setup lang="ts">
import { useAttrs } from 'vue';

import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DialogDescriptionProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-dialog-description"
    :class="[$attrs.class]"
  >
    <slot />
  </DialogDescription>
</template>

<style>
@layer components {
  .sigma-ui-dialog-description {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }
}
</style>
