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
  <h5
    data-slot="alert-title"
    v-bind="delegatedAttrs()"
    :class="cn('mb-1 font-medium leading-none tracking-tight', $attrs.class ?? '')"
  >
    <slot />
  </h5>
</template>
