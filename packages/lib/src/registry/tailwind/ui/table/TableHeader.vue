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
  <thead
    v-bind="delegatedAttrs"
    :class="cn('[&_tr]:border-b', $attrs.class ?? '')"
    data-slot="table-header"
  >
    <slot />
  </thead>
</template>
