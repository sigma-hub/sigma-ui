<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * `Kbd` elements that form one shortcut.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    data-slot="kbd-group"
    :class="cn('inline-flex items-center gap-1', $attrs.class ?? '')"
  >
    <slot />
  </kbd>
</template>
