<script setup lang="ts">
import { useAttrs } from 'vue';

import { Separator, type SeparatorProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<
  SeparatorProps & {
    /** Text displayed centered on the line. */
    label?: string;
  }
>();
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-separator"
    :class="[$attrs.class]"
  >
    <span
      v-if="props.label"

      class="sigma-ui-separator__label"
    >{{ props.label }}</span>
  </Separator>
</template>

<style>
.sigma-ui-separator {
  position: relative;
  flex-shrink: 0;
  background-color: var(--border);
}

.sigma-ui-separator[data-orientation="vertical"] {
  width: 1px;
  height: 100%;
}

.sigma-ui-separator[data-orientation="horizontal"] {
  width: 100%;
  height: 1px;
}

.sigma-ui-separator__label {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  color: var(--muted-foreground);
  font-size: 0.75rem;
  transform: translate(-50%, -50%);
}

.sigma-ui-separator[data-orientation="vertical"] .sigma-ui-separator__label {
  width: 1px;
  padding: 0 calc(var(--spacing) * 1);
  padding-block: calc(var(--spacing) * 2);
}

.sigma-ui-separator[data-orientation="horizontal"] .sigma-ui-separator__label {
  height: 1px;
  padding: calc(var(--spacing) * 1) 0;
  padding-inline: calc(var(--spacing) * 2);
}
</style>
