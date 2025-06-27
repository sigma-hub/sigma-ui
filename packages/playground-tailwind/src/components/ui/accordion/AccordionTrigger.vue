<script setup lang="ts">
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const props = defineProps<AccordionTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="forwarded"
      :class="cn('flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180', $attrs.class ?? '')"
    >
      <slot />
      <slot name="icon">
        <ChevronDownIcon
          class="h-4 w-4 shrink-0 transition-transform duration-200"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
