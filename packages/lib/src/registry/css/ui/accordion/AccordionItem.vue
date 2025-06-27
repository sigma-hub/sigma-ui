<script setup lang="ts">
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui';

const props = defineProps<AccordionItemProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionItem
    v-bind="forwarded"
    class="sigma-ui-accordion-item"
    :class="[$attrs.class]"
  >
    <slot />
  </AccordionItem>
</template>

<style>
.sigma-ui-accordion-item {
  border-bottom: 1px solid hsl(var(--border));
}
</style>
