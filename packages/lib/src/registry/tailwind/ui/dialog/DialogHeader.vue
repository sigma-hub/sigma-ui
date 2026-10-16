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
  <div
    v-bind="delegatedAttrs"
    :class="cn('flex flex-col gap-y-1.5 text-center sm:text-left', $attrs.class ?? '')"
    data-slot="dialog-header"
  >
    <slot />
  </div>
</template>
