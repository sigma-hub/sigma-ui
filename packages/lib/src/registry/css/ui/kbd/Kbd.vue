<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineSlots<{
  /**
   * Key label, such as `Ctrl` or an icon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <kbd
    v-bind="delegatedAttrs()"
    data-slot="kbd"
    class="sigma-ui-kbd"
    :class="[$attrs.class]"
  >
    <slot />
  </kbd>
</template>

<style>
.sigma-ui-kbd {
  display: inline-flex;
  width: fit-content;
  min-width: 1.25rem;
  height: 1.25rem;
  align-items: center;
  justify-content: center;
  padding: 0 0.25rem;
  border-radius: calc(var(--radius) - 4px);
  background-color: var(--muted);
  color: var(--muted-foreground);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 500;
  gap: 0.25rem;
  pointer-events: none;
  user-select: none;
}

.sigma-ui-kbd svg {
  width: 0.75rem;
  height: 0.75rem;
}

[data-slot='tooltip-content'] .sigma-ui-kbd {
  background-color: color-mix(in oklch, var(--background) 20%, transparent);
  color: var(--background);
}
</style>
