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
  /** Buttons such as `CodeBlockCopyButton` and `CodeBlockWrapButton`. */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="code-block-actions"
    v-bind="delegatedAttrs()"
    class="sigma-ui-code-block__actions"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-code-block__actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin-left: auto;
  gap: 0.125rem;
}

[data-slot='code-block'] > .sigma-ui-code-block__actions {
  position: absolute;
  z-index: 1;
  top: 0.375rem;
  right: 0.375rem;
  opacity: 0;
  transition: opacity 150ms ease;
}

[data-slot='code-block'][data-size='sm'] > .sigma-ui-code-block__actions {
  top: 0.25rem;
  right: 0.25rem;
}

[data-slot='code-block']:hover > .sigma-ui-code-block__actions,
[data-slot='code-block']:focus-within > .sigma-ui-code-block__actions {
  opacity: 1;
}

[data-slot='code-block'] > .sigma-ui-code-block__actions .sigma-ui-button {
  border: 1px solid var(--code-block-border);
  backdrop-filter: blur(6px);
  background-color: color-mix(in oklch, var(--background) 85%, transparent);
}

@media (pointer: coarse) {
  [data-slot='code-block'] > .sigma-ui-code-block__actions {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  [data-slot='code-block'] > .sigma-ui-code-block__actions {
    transition: none;
  }
}
</style>
