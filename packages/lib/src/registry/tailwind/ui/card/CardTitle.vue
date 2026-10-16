<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <h3
    v-bind="delegatedAttrs"
    :class="
      cn('text-2xl font-semibold leading-none tracking-tight', $attrs.class ?? '')
    "
    data-slot="card-title"
  >
    <slot />
  </h3>
</template>
