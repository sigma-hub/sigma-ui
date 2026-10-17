<script setup lang="ts">
import { useAttrs } from 'vue';

import { AccordionContent, type AccordionContentProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AccordionContentProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionContent
    v-bind="forwarded"
    class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    data-slot="accordion-content"
  >
    <div
      v-bind="delegatedAttrs()"
      :class="cn('pb-4 pt-0', $attrs.class ?? '')"
    >
      <slot />
    </div>
  </AccordionContent>
</template>
