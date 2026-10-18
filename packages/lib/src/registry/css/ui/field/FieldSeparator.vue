<script setup lang="ts">
import { useAttrs } from 'vue';

import { Separator } from '@ui/registry/css/ui/separator';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
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
  height: calc(var(--spacing) * 5);
  margin: calc(var(--spacing) * -2) 0;
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
  padding: 0 calc(var(--spacing) * 2);
  margin: 0 auto;
  background-color: var(--background);
  color: var(--muted-foreground);
}
</style>
