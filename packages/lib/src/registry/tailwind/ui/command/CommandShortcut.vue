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
    v-bind="delegatedAttrs()"
    :class="cn('ml-auto text-xs tracking-widest text-muted-foreground', $attrs.class ?? '')"
    data-slot="command-shortcut"
  >
    <slot />
  </span>
</template>
