<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxGroupProps } from 'reka-ui';
import { ComboboxGroup, ComboboxLabel } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxGroupProps & {
  /** Label shown above the group items. */
  heading?: string;
}>();
</script>

<template>
  <ComboboxGroup
    v-bind="{ ...props, ...delegatedAttrs }"
    class="sigma-ui-command-group text-xs"
    data-slot="command-group"
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
.sigma-ui-command-group {
  overflow: hidden;
  padding: 0.25rem;
  color: var(--foreground);
}

.sigma-ui-command-group [cmdk-group-heading] {
  padding: 0.375rem 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
}

.sigma-ui-command-group__heading {
  padding: 0.375rem 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
}
</style>
