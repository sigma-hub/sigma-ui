<script setup lang="ts">
import { cn } from '@ui/utils';

defineSlots<{
  /**
   * Text or an icon shown inside an addon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <span
    data-slot="input-group-text"
    :class="cn('flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4', $attrs.class ?? '')"
  >
    <slot />
  </span>
</template>
