<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AccordionContent, type AccordionContentProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
      v-bind="delegatedAttrs"
      :class="cn('pb-4 pt-0', $attrs.class ?? '')"
    >
      <slot />
    </div>
  </AccordionContent>
</template>
