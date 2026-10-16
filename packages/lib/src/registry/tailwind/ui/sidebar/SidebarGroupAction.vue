<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'button',
});

defineSlots<{
  /**
   * Action icon. Add a visually hidden label for screen readers.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
      'after:absolute after:-inset-2 md:after:hidden',
      'group-data-[collapsible=icon]:hidden',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </Primitive>
</template>
