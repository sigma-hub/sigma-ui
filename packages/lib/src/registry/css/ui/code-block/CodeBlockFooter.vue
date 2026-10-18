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
  /** Content below the code, such as a `CodeBlockExpandButton`. */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="code-block-footer"
    v-bind="delegatedAttrs()"
    class="sigma-ui-code-block__footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-code-block__footer {
  display: flex;
  min-width: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-top: 1px solid var(--code-block-border);
  color: var(--muted-foreground);
  gap: 0.5rem;
}

.sigma-ui-code-block__footer:empty {
  display: none;
}
</style>
