<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Separator } from '@ui/registry/tailwind/ui/separator';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <Separator
    v-bind="delegatedAttrs"
    data-slot="sidebar-separator"
    data-sidebar="separator"
    :class="cn('mx-2 w-auto bg-border', $attrs.class ?? '')"
  />
</template>
