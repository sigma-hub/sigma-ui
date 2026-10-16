<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Secondary text. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    data-slot="item-description"
    :class="cn('line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', $attrs.class ?? '')"
  >
    <slot />
  </p>
</template>
