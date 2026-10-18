<script setup lang="ts">
import { useAttrs } from 'vue';

import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-tabs-trigger"
    :class="[$attrs.class]"
  >
    <slot />
  </TabsTrigger>
</template>

<style>
.sigma-ui-tabs-trigger {
  display: inline-flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  padding-inline: calc(var(--spacing) * 3);
  transition-duration: 150ms;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.sigma-ui-tabs-trigger:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-tabs-trigger:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-tabs-trigger[data-state="active"] {
  background-color: var(--input);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  color: var(--foreground);
}
</style>
