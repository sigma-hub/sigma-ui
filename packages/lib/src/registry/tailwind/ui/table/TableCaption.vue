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
  <caption
    v-bind="delegatedAttrs"
    :class="cn('mt-4 text-sm text-muted-foreground', $attrs.class ?? '')"
    data-slot="table-caption"
  >
    <slot />
  </caption>
</template>
