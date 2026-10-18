<script setup lang="ts">
import { useAttrs } from 'vue';

import { DialogTitle, type DialogTitleProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DialogTitleProps>();
</script>

<template>
  <DialogTitle
    class="sigma-ui-sheet-title"
    data-slot="sheet-title"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </DialogTitle>
</template>

<style>
.sigma-ui-sheet-title {
  color: var(--foreground);
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
