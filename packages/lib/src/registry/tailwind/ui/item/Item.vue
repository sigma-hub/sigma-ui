<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { type ItemVariants, itemVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
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
