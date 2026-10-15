<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'vertical',
});
</script>

<template>
  <Separator
    v-bind="props"
    data-slot="button-group-separator"
    :class="cn('relative m-0! self-stretch bg-border data-[orientation=vertical]:h-auto', $attrs.class ?? '')"
  />
</template>
