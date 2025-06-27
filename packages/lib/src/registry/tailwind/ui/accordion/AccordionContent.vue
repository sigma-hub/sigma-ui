<script setup lang="ts">
import { AccordionContent, type AccordionContentProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<AccordionContentProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionContent
    v-bind="forwarded"
    class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <div :class="cn('pb-4 pt-0', $attrs.class ?? '')">
      <slot />
    </div>
  </AccordionContent>
</template>
