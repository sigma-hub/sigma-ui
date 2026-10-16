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
  <span
    v-bind="delegatedAttrs"
    :class="cn('ml-auto text-xs tracking-widest opacity-60', $attrs.class ?? '')"
    data-slot="dropdown-menu-shortcut"
  >
    <slot />
  </span>
</template>
