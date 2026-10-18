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
  <span
    data-slot="command-shortcut"
    v-bind="delegatedAttrs()"
    :class="cn('ml-auto text-xs tracking-widest text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </span>
</template>
