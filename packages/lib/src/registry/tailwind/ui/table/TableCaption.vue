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
  <caption
    data-slot="table-caption"
    v-bind="delegatedAttrs()"
    :class="cn('mt-4 text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </caption>
</template>
