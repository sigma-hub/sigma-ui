<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Key label, such as `Ctrl` or an icon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="cn(
      'pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground',
      '[&_svg:not([class*=size-])]:size-3',
      '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </kbd>
</template>
