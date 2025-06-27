<script setup lang="ts">
import { AccordionContent, type AccordionContentProps, useForwardProps } from 'reka-ui';

const props = defineProps<AccordionContentProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AccordionContent
    v-bind="forwarded"
    class="sigma-ui-accordion-content"
  >
    <div
      class="sigma-ui-accordion-content-inner"
      :class="[$attrs.class]"
    >
      <slot />
    </div>
  </AccordionContent>
</template>

<style>
.sigma-ui-accordion-content {
  overflow: hidden;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.sigma-ui-accordion-content[data-state='closed'] {
  animation: accordion-up 0.2s ease-out;
}

.sigma-ui-accordion-content[data-state='open'] {
  animation: accordion-down 0.2s ease-out;
}

.sigma-ui-accordion-content-inner {
  padding: 0 0 1rem 0;
}

@keyframes accordion-up {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}
</style>
