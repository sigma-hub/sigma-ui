<script setup lang="ts">
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <Textarea
    v-bind="$attrs"
    data-slot="input-group-control"
    :class="cn('flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:outline-none', $attrs.class ?? '')"
  />
</template>
