<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { type ItemVariants, itemVariants } from '.';

interface ItemProps extends PrimitiveProps {
  /**
   * Surface of the row.
   */
  variant?: ItemVariants['variant'];
  /**
   * Padding and gap of the row.
   */
  size?: ItemVariants['size'];
}

const props = withDefaults(defineProps<ItemProps>(), {
  as: 'div',
  variant: 'default',
  size: 'default',
});

defineSlots<{
  /**
   * Media, content, and actions for one row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="item"
    :data-variant="props.variant"
    :data-size="props.size"
    :as="as"
    :as-child="asChild"
    :class="cn(itemVariants({ variant: props.variant, size: props.size }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
