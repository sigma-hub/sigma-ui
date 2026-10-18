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
   * `Item` rows, optionally divided by `ItemSeparator`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-group"
    v-bind="delegatedAttrs()"
    role="list"
    :class="cn('group/item-group flex flex-col', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
