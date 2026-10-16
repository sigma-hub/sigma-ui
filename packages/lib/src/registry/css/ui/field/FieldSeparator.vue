<script setup lang="ts">
import { Separator } from '@ui/registry/css/ui/separator';

const slots = defineSlots<{
  /**
   * Optional text shown in the middle of the line, such as "Or continue with".
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-separator"
    :data-content="!!slots.default"
    class="sigma-ui-field-separator"
  >
    <Separator class="sigma-ui-field-separator__line" />
    <span
      v-if="slots.default"
      class="sigma-ui-field-separator__content"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>

<style>
.sigma-ui-field-separator {
  position: relative;
  height: 1.25rem;
  margin: -0.5rem 0;
  font-size: 0.875rem;
}

.sigma-ui-separator.sigma-ui-field-separator__line {
  position: absolute;
  top: 50%;
  inset-inline: 0;
}

.sigma-ui-field-separator__content {
  position: relative;
  display: block;
  width: fit-content;
  padding: 0 0.5rem;
  margin: 0 auto;
  background-color: var(--background);
  color: var(--muted-foreground);
}
</style>
