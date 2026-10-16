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
  <h5
    v-bind="delegatedAttrs"
    :class="cn('mb-1 font-medium leading-none tracking-tight', $attrs.class ?? '')"
    data-slot="alert-title"
  >
    <slot />
  </h5>
</template>
