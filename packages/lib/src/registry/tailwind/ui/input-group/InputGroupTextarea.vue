<script setup lang="ts">
import { useAttrs } from 'vue';

import { Textarea } from '@ui/registry/tailwind/ui/textarea';
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
  <Textarea
    data-slot="input-group-control"
    v-bind="delegatedAttrs()"
    :class="cn('flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:outline-none', $attrs.class ?? '')"
  />
</template>
