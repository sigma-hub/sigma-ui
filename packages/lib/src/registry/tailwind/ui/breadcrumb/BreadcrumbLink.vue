<script lang="ts" setup>
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs()"
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', $attrs.class ?? '')"
    data-slot="breadcrumb-link"
  >
    <slot />
  </Primitive>
</template>
