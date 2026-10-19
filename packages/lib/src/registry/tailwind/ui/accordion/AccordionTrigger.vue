<script setup lang="ts">
import { useAttrs } from 'vue';

import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<AccordionTriggerProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /** The trigger label. */
  default?: () => unknown;
  /** Replaces the chevron icon that rotates when the item opens. */
  icon?: () => unknown;
}>();
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      :class="cn('flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180', $attrs.class ?? '')"
    >
      <slot />
      <slot name="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 shrink-0 transition-transform duration-200"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
