<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn('border-b', $attrs.class ?? '')"
    data-slot="accordion-item"
  >
    <slot />
  </AccordionItem>
</template>
