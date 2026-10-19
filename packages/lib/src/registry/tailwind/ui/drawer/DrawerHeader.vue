<script lang="ts" setup>
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
    data-slot="drawer-header"
    v-bind="delegatedAttrs()"
    :class="cn('grid gap-1.5 p-4 text-center sm:text-left', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
