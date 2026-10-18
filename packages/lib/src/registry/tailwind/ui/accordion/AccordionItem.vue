<script setup lang="ts">
import { useAttrs } from 'vue';

import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AccordionItemProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionItem
    data-slot="accordion-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('border-b', $attrs.class ?? '')"
  >
    <slot />
  </AccordionItem>
</template>
