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
    v-bind="delegatedAttrs"
    :class="cn('text-sm [&_p]:leading-relaxed', $attrs.class ?? '')"
    data-slot="alert-description"
  >
    <slot />
  </div>
</template>
