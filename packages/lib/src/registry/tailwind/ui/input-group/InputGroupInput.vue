<script setup lang="ts">
import { useAttrs } from 'vue';

import { Input } from '@ui/registry/tailwind/ui/input';
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
  <Input
    v-bind="delegatedAttrs()"
    data-slot="input-group-control"
    :class="cn('h-auto flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:outline-none', $attrs.class ?? '')"
  />
</template>
