<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs"
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', $attrs.class ?? '')"
    data-slot="breadcrumb-link"
  >
    <slot />
  </Primitive>
</template>
