<script lang="ts" setup>
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
    :class="cn('grid gap-1.5 p-4 text-center sm:text-left', $attrs.class ?? '')"
    data-slot="drawer-header"
  >
    <slot />
  </div>
</template>
