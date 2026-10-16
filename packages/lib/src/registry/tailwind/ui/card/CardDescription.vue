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
  <p
    v-bind="delegatedAttrs"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
    data-slot="card-description"
  >
    <slot />
  </p>
</template>
