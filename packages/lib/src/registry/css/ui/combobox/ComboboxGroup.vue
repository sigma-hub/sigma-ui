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
    data-slot="combobox-group"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="['sigma-ui-combobox-group', $attrs.class]"
  >
    <ComboboxLabel
      v-if="heading"
      class="sigma-ui-combobox-group__heading"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<style>
.sigma-ui-combobox-group {
  overflow: hidden;
  padding: 0.25rem;
  color: var(--foreground);
}

.sigma-ui-combobox-group [cmdk-group-heading] {
  padding: 0.375rem 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
}

.sigma-ui-combobox-group__heading {
  padding: 0.375rem 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
}
</style>
