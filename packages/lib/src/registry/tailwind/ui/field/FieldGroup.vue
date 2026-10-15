<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * `Field`, `FieldSet`, and `FieldSeparator` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-group"
    :class="cn('group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
