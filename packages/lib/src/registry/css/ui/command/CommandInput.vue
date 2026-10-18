<script setup lang="ts">
import { useAttrs } from 'vue';

import { SearchIcon } from 'lucide-vue-next';
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <div
    class="sigma-ui-command-input"
    cmdk-input-wrapper
    data-slot="command-input"
  >
    <SearchIcon class="sigma-ui-command-input__icon" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
      auto-focus
      class="sigma-ui-command-input__field"
      :class="[$attrs.class]"
    />
  </div>
</template>

<style>
.sigma-ui-command-input {
  display: flex;
  align-items: center;
  padding-right: calc(var(--spacing) * 3);
  padding-left: calc(var(--spacing) * 3);
  border-bottom: 1px solid var(--border);
}

.sigma-ui-command-input__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  flex-shrink: 0;
  margin-right: calc(var(--spacing) * 2);
  opacity: 0.5;
}

.sigma-ui-command-input__field {
  display: flex;
  width: 100%;
  height: calc(var(--spacing) * 11);
  padding-top: calc(var(--spacing) * 3);
  padding-bottom: calc(var(--spacing) * 3);
  border-radius: var(--radius-md);
  background-color: transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
}

.sigma-ui-command-input__field::placeholder {
  color: var(--muted-foreground);
}

.sigma-ui-command-input__field:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
