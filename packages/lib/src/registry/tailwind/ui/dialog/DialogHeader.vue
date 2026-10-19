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
    data-slot="dialog-header"
    v-bind="delegatedAttrs()"
    :class="cn('flex flex-col gap-y-1.5 text-center sm:text-left', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
