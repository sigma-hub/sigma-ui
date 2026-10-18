<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineSlots<{
  /**
   * Title text. Use instead of `FieldLabel` when the title is not tied to a single control.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-label"
    v-bind="delegatedAttrs()"
    :class="cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
