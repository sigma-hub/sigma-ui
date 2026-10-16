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
    class="relative w-full overflow-auto"
    data-slot="table"
  >
    <table
      v-bind="delegatedAttrs"
      :class="cn('w-full caption-bottom text-sm', $attrs.class ?? '')"
    >
      <slot />
    </table>
  </div>
</template>
