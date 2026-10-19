<script setup lang="ts">
import { useAttrs } from 'vue';

import { Separator } from '@ui/registry/tailwind/ui/separator';
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
  <Separator
    data-slot="sidebar-separator"
    v-bind="delegatedAttrs()"
    data-sidebar="separator"
    :class="cn('mx-2 w-auto bg-border', $attrs.class ?? '')"
  />
</template>
