<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Explanation of the empty state. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    data-slot="empty-description"
    :class="cn('text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', $attrs.class ?? '')"
  >
    <slot />
  </p>
</template>
