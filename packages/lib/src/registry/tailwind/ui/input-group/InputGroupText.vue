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

defineSlots<{
  /**
   * Text or an icon shown inside an addon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <span
    data-slot="input-group-text"
    v-bind="delegatedAttrs()"
    :class="cn('flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4', $attrs.class ?? '')"
  >
    <slot />
  </span>
</template>
