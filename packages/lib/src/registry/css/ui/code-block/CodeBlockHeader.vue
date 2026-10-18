<script setup lang="ts">
import { useAttrs } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});

defineSlots<{
  /** A `CodeBlockTitle` or `CodeBlockTabsList`, then `CodeBlockActions`. */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs()"
    :as="props.as"
    :as-child="props.asChild"
    data-slot="code-block-header"
    class="sigma-ui-code-block__header"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-code-block__header {
  display: flex;
  min-width: 0;
  min-height: 2.5rem;
  flex-shrink: 0;
  align-items: center;
  padding: 0.25rem 0.375rem 0.25rem 0.875rem;
  border-bottom: 1px solid var(--code-block-border);
  background-color: var(--code-block-header);
  color: var(--muted-foreground);
  font-family: inherit;
  font-size: 0.8125rem;
  gap: 0.5rem;
  line-height: 1.25rem;
}

.sigma-ui-code-block__header:has(> [data-slot='code-block-tabs-list']) {
  padding-left: 0.375rem;
}

[data-size='sm'] .sigma-ui-code-block__header {
  min-height: 2rem;
  padding: 0.125rem 0.25rem 0.125rem 0.625rem;
  font-size: 0.75rem;
}

[data-size='sm'] .sigma-ui-code-block__header:has(> [data-slot='code-block-tabs-list']) {
  padding-left: 0.25rem;
}

[data-variant='destructive'] > .sigma-ui-code-block__header {
  border-color: color-mix(in oklch, var(--destructive) 30%, var(--border));
  background-color: color-mix(in oklch, var(--destructive) 8%, var(--code-block-header));
  color: var(--code-block-destructive-foreground);
}
</style>
