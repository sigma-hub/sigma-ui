<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});

defineSlots<{
  /**
   * Label text, optionally with an icon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground outline-hidden ring-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:select-none',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </Primitive>
</template>
