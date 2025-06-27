<script setup lang="ts">
import type { ComboboxGroupProps } from 'reka-ui';
import { ComboboxGroup, ComboboxLabel } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ComboboxGroupProps & {
  heading?: string;
}>();
</script>

<template>
  <ComboboxGroup
    v-bind="{ ...props, ...$attrs }"
    :class="cn('overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', $attrs.class ?? '')"
  >
    <ComboboxLabel
      v-if="heading"
      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
