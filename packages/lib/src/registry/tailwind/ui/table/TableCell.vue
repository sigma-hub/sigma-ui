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
  <td
    v-bind="delegatedAttrs"
    :class="
      cn(
        'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        $attrs.class ?? '',
      )
    "
    data-slot="table-cell"
  >
    <slot />
  </td>
</template>
