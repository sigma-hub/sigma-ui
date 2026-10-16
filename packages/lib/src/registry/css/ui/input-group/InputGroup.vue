<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * Addons and one `InputGroupInput` or `InputGroupTextarea`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="input-group"
    role="group"
    class="sigma-ui-input-group"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-input-group {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  height: 2.25rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input);
  outline: none;
  transition: color 0.15s, box-shadow 0.15s;
}

.sigma-ui-input-group:has(> textarea) {
  height: auto;
}

.sigma-ui-input-group:has(> [data-align="inline-start"]) > .sigma-ui-input-group__control {
  padding-left: 0.5rem;
}

.sigma-ui-input-group:has(> [data-align="inline-end"]) > .sigma-ui-input-group__control {
  padding-right: 0.5rem;
}

.sigma-ui-input-group:has(> [data-align="block-start"]),
.sigma-ui-input-group:has(> [data-align="block-end"]) {
  height: auto;
  flex-direction: column;
}

.sigma-ui-input-group:has(> [data-align="block-start"]) > .sigma-ui-input-group__control {
  padding-bottom: 0.75rem;
}

.sigma-ui-input-group:has(> [data-align="block-end"]) > .sigma-ui-input-group__control {
  padding-top: 0.75rem;
}

.sigma-ui-input-group:has(.sigma-ui-input-group__control:focus-visible) {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-input-group:has([aria-invalid="true"]) {
  border-color: var(--destructive);
}

.sigma-ui-input-group:has(.sigma-ui-input-group__control:disabled) {
  opacity: 0.5;
}

.sigma-ui-input-group .sigma-ui-input.sigma-ui-input-group__control,
.sigma-ui-input-group .sigma-ui-textarea.sigma-ui-input-group__control {
  height: auto;
  flex: 1;
  border-width: 0;
  border-radius: 0;
  background-color: transparent;
  box-shadow: none;
}

.sigma-ui-input-group .sigma-ui-input.sigma-ui-input-group__control:focus-visible,
.sigma-ui-input-group .sigma-ui-textarea.sigma-ui-input-group__control:focus-visible {
  outline: none;
}

.sigma-ui-input-group .sigma-ui-textarea.sigma-ui-input-group__control {
  padding-block: 0.75rem;
  resize: none;
}
</style>
