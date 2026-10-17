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
  <p
    v-bind="delegatedAttrs()"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
    data-slot="card-description"
  >
    <slot />
  </p>
</template>
