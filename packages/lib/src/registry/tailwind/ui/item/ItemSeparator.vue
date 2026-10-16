<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <Separator
    v-bind="props"
    data-slot="item-separator"
    :class="cn('my-0', $attrs.class ?? '')"
  />
</template>
