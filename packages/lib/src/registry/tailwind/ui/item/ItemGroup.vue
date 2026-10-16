<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * `Item` rows, optionally divided by `ItemSeparator`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    role="list"
    data-slot="item-group"
    :class="cn('group/item-group flex flex-col', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
