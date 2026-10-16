<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
  <AccordionHeader class="sigma-ui-accordion-header">
    <AccordionTrigger
      v-bind="{ ...forwarded, ...delegatedAttrs }"
      class="sigma-ui-accordion-trigger"
      :class="[$attrs.class]"
      data-slot="accordion-trigger"
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
          class="sigma-ui-accordion-trigger-icon"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
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
