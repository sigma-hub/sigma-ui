<script setup lang="ts">
import { useAttrs } from 'vue';

import { DialogDescription, type DialogDescriptionProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DialogDescriptionProps>();
</script>

<template>
  <DialogDescription
    class="sigma-ui-sheet-description"
    data-slot="sheet-description"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </DialogDescription>
</template>

<style>
@layer components {
  .sigma-ui-sheet-description {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }
}
</style>
