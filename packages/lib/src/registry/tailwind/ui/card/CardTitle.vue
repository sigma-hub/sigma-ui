<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <h3
    data-slot="card-title"
    v-bind="delegatedAttrs()"
    :class="
      cn('text-2xl font-semibold leading-none tracking-tight', $attrs.class ?? '')
    "
  >
    <slot />
  </h3>
</template>
