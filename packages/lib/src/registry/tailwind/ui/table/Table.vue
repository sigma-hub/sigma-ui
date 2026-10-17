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
  <div
    class="relative w-full overflow-auto"
    data-slot="table"
  >
    <table
      v-bind="delegatedAttrs()"
      :class="cn('w-full caption-bottom text-sm', $attrs.class ?? '')"
    >
      <slot />
    </table>
  </div>
</template>
