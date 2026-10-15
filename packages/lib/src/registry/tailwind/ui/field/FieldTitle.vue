<script setup lang="ts">
import { cn } from '@ui/utils';

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
    :class="cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
