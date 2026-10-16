<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * `Item` rows, optionally divided by `ItemSeparator`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    role="list"
    data-slot="item-group"
    :class="cn('group/item-group flex flex-col', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
