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
  <ol
    v-bind="delegatedAttrs()"
    :class="cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', $attrs.class ?? '')"
    data-slot="breadcrumb-list"
  >
    <slot />
  </ol>
</template>
