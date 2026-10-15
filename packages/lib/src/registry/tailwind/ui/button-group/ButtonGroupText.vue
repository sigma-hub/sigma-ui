<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});

defineSlots<{
  /**
   * Static text or an icon, such as a URL prefix or a unit.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="button-group-text"
    :as="as"
    :as-child="asChild"
    :class="cn('flex items-center gap-2 rounded-md border border-border bg-muted px-4 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4', $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
