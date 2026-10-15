<script setup lang="ts">
import { Input } from '@ui/registry/tailwind/ui/input';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Input
    v-bind="$attrs"
    data-slot="input-group-control"
    :class="cn('h-auto flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:outline-none', $attrs.class ?? '')"
  />
</template>
