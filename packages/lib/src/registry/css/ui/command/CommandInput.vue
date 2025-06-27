<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ComboboxInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <div
    class="sigma-ui-command-input"
    cmdk-input-wrapper
  >
    <SearchIcon class="sigma-ui-command-input__icon" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      class="sigma-ui-command-input__field"
    />
  </div>
</template>

<style>
.sigma-ui-command-input {
  display: flex;
  align-items: center;
  border-bottom: 1px solid hsl(var(--border));
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.sigma-ui-command-input__icon {
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  opacity: 0.5;
}

.sigma-ui-command-input__field {
  display: flex;
  height: 2.75rem;
  width: 100%;
  border-radius: var(--radius-md);
  background-color: transparent;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
}

.sigma-ui-command-input__field::placeholder {
  color: hsl(var(--muted-foreground));
}

.sigma-ui-command-input__field:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
