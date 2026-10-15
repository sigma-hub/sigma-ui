<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * A `FieldLegend`, an optional `FieldDescription`, and a `FieldGroup`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <fieldset
    data-slot="field-set"
    :class="cn('flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', $attrs.class ?? '')"
  >
    <slot />
  </fieldset>
</template>
