<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxGroupProps } from 'reka-ui';
import { ComboboxGroup, ComboboxLabel } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxGroupProps & {
  /** Label shown above the group items. */
  heading?: string;
}>();
</script>

<template>
  <ComboboxGroup
    data-slot="command-group"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-command-group text-xs"
    :class="[$attrs.class]"
  >
    <ComboboxLabel
      v-if="heading"
      class="sigma-ui-command-group__heading"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<style>
@layer components {
  .sigma-ui-command-group {
    overflow: hidden;
    padding: calc(var(--spacing) * 1);
    color: var(--foreground);
  }

  .sigma-ui-command-group [cmdk-group-heading] {
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    color: var(--muted-foreground);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
  }

  .sigma-ui-command-group__heading {
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    color: var(--muted-foreground);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
  }
}
</style>
