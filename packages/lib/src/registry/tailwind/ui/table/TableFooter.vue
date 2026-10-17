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
  <tfoot
    v-bind="delegatedAttrs()"
    :class="cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', $attrs.class ?? '')"
    data-slot="table-footer"
  >
    <slot />
  </tfoot>
</template>
