<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { DialogTitle, type DialogTitleProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DialogTitleProps>();
</script>

<template>
  <DialogTitle
    class="sigma-ui-sheet-title"
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="sheet-title"
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
