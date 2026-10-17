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
  <td
    v-bind="delegatedAttrs()"
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
