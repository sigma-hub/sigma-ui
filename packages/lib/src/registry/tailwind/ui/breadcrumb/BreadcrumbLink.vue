<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
