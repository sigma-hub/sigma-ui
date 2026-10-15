<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * `NativeSelectOption` children of this group.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <optgroup
    data-slot="native-select-optgroup"
    :class="cn('bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </optgroup>
</template>
