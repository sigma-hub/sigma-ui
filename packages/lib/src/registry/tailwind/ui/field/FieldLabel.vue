<script setup lang="ts">
import type { LabelProps } from 'reka-ui';
import { Label } from '@ui/registry/tailwind/ui/label';
import { cn } from '@ui/utils';

const props = defineProps<LabelProps>();

defineSlots<{
  /**
   * Label text. Wrap a whole `Field` to turn it into a selectable card.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Label
    v-bind="props"
    data-slot="field-label"
    :class="cn(
      'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
      'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4',
      'has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </Label>
</template>
