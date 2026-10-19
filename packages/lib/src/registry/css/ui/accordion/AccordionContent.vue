<script setup lang="ts">
import { useAttrs } from 'vue';

import { AccordionContent, type AccordionContentProps, useForwardProps } from 'reka-ui';
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
    data-slot="accordion-content"
    v-bind="forwarded"
    class="sigma-ui-accordion-content"
  >
    <div
      v-bind="delegatedAttrs()"
      class="sigma-ui-accordion-content-inner"
      :class="[$attrs.class]"
    >
      <slot />
    </div>
  </AccordionContent>
</template>

<style>
@layer components {
  .sigma-ui-accordion-content {
    overflow: hidden;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .sigma-ui-accordion-content[data-state='closed'] {
    animation: sigma-ui-accordion-up 0.2s ease-out;
  }

  .sigma-ui-accordion-content[data-state='open'] {
    animation: sigma-ui-accordion-down 0.2s ease-out;
  }

  .sigma-ui-accordion-content-inner {
    padding: 0 0 calc(var(--spacing) * 4);
  }
}
</style>
