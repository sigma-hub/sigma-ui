<script setup lang="ts">
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';

const props = defineProps<AccordionTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionHeader class="sigma-ui-accordion-header">
    <AccordionTrigger
      v-bind="forwarded"
      class="sigma-ui-accordion-trigger"
      :class="[$attrs.class]"
    >
      <slot />
      <slot name="icon">
        <ChevronDownIcon class="sigma-ui-accordion-trigger-icon" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

<style>
.sigma-ui-accordion-header {
  display: flex;
}

.sigma-ui-accordion-trigger {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: 500;
  transition: all 0.2s;
}

.sigma-ui-accordion-trigger-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.sigma-ui-accordion-trigger[data-state="open"] .sigma-ui-accordion-trigger-icon {
  transform: rotate(180deg);
}
</style>
