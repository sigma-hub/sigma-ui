<script setup lang="ts">
import { Separator, type SeparatorProps } from 'reka-ui';

const props = defineProps<
  SeparatorProps & { label?: string }
>();
</script>

<template>
  <Separator
    v-bind="props"
    class="sigma-ui-separator"
  >
    <span
      v-if="props.label"

      class="sigma-ui-separator__label"
    >{{ props.label }}</span>
  </Separator>
</template>

<style>
.sigma-ui-separator {
  flex-shrink: 0;
  background-color: hsl(var(--border));
  position: relative;
}

.sigma-ui-separator[data-orientation="vertical"] {
  width: 1px;
  height: 100%;
}

.sigma-ui-separator[data-orientation="horizontal"] {
  height: 1px;
  width: 100%;
}

.sigma-ui-separator__label {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  background-color: hsl(var(--background));
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.sigma-ui-separator[data-orientation="vertical"] .sigma-ui-separator__label {
  width: 1px;
  padding: 0 0.25rem;
  padding-block: 0.5rem;
}

.sigma-ui-separator[data-orientation="horizontal"] .sigma-ui-separator__label {
  height: 1px;
  padding: 0.25rem 0;
  padding-inline: 0.5rem;
}
</style>
