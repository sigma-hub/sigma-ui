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

defineSlots<{
  /** A file name or a package manager, with an optional leading icon. */
  default?: () => unknown;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TabsTrigger
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    data-slot="code-block-tabs-trigger"
    class="sigma-ui-code-block__tabs-trigger"
    :class="[$attrs.class]"
  >
    <slot />
  </TabsTrigger>
</template>

<style>
.sigma-ui-code-block__tabs-trigger {
  display: inline-flex;
  height: 1.75rem;
  flex-shrink: 0;
  align-items: center;
  padding: 0 0.625rem;
  border: 0;
  border-radius: calc(var(--radius) - 4px);
  background: none;
  color: var(--muted-foreground);
  cursor: pointer;
  font: inherit;
  font-weight: 500;
  gap: 0.375rem;
  outline: none;
  transition: color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
  white-space: nowrap;
}

[data-size='sm'] .sigma-ui-code-block__tabs-trigger {
  height: 1.5rem;
  padding: 0 0.5rem;
}

.sigma-ui-code-block__tabs-trigger svg {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.sigma-ui-code-block__tabs-trigger:hover {
  color: var(--foreground);
}

.sigma-ui-code-block__tabs-trigger[data-state='active'] {
  background-color: var(--background);
  box-shadow: 0 0 0 1px var(--code-block-border), 0 1px 2px rgb(0 0 0 / 5%);
  color: var(--foreground);
}

.sigma-ui-code-block__tabs-trigger:focus-visible {
  box-shadow: 0 0 0 2px var(--ring);
}

.sigma-ui-code-block__tabs-trigger:disabled {
  opacity: 0.5;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .sigma-ui-code-block__tabs-trigger {
    transition: none;
  }
}
</style>
