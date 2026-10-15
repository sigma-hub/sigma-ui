<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * `FieldLabel` or `FieldTitle` with a `FieldDescription`, placed next to a checkbox, radio, or switch.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-content"
    :class="cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
