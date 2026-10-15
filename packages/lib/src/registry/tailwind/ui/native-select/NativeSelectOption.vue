<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Label of the option.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <option
    data-slot="native-select-option"
    :class="cn('bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </option>
</template>
