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
  <tr
    data-slot="table-row"
    v-bind="delegatedAttrs()"
    :class="cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', $attrs.class ?? '')"
  >
    <slot />
  </tr>
</template>
