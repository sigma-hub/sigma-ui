<script setup lang="ts">
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<AccordionItemProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionItem
    v-bind="forwarded"
    :class="cn('border-b', $attrs.class ?? '')"
  >
    <slot />
  </AccordionItem>
</template>
