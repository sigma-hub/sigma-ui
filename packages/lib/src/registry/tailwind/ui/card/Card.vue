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
    data-slot="card"
    v-bind="delegatedAttrs()"
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </div>
</template>
