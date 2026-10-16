<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<AccordionItemProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionItem
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-accordion-item"
    :class="[$attrs.class]"
    data-slot="accordion-item"
  >
    <slot />
  </AccordionItem>
</template>

<style>
.sigma-ui-accordion-item {
  border-bottom: 1px solid var(--border);
}
</style>
