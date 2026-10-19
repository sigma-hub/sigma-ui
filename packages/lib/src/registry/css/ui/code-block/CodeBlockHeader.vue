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
    data-slot="code-block-header"
    v-bind="delegatedAttrs()"
    :as="props.as"
    :as-child="props.asChild"
    class="sigma-ui-code-block__header"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
@layer components {
  .sigma-ui-code-block__header {
    display: flex;
    min-width: 0;
    min-height: calc(var(--spacing) * 10);
    flex-shrink: 0;
    align-items: center;
    padding: calc(var(--spacing) * 1) calc(var(--spacing) * 1.5) calc(var(--spacing) * 1) calc(var(--spacing) * 3.5);
    border-bottom: 1px solid var(--code-block-border);
    background-color: var(--code-block-header);
    color: var(--muted-foreground);
    font-family: inherit;
    font-size: 0.8125rem;
    gap: calc(var(--spacing) * 2);
    line-height: 1.25rem;
  }

  .sigma-ui-code-block__header:has(> [data-slot='code-block-tabs-list']) {
    padding-left: calc(var(--spacing) * 1.5);
  }

  [data-size='sm'] .sigma-ui-code-block__header {
    min-height: calc(var(--spacing) * 8);
    padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 1) calc(var(--spacing) * 0.5) calc(var(--spacing) * 2.5);
    font-size: 0.75rem;
  }

  [data-size='sm'] .sigma-ui-code-block__header:has(> [data-slot='code-block-tabs-list']) {
    padding-left: calc(var(--spacing) * 1);
  }

  [data-variant='destructive'] > .sigma-ui-code-block__header {
    border-color: color-mix(in oklch, var(--destructive) 30%, var(--border));
    background-color: color-mix(in oklch, var(--destructive) 8%, var(--code-block-header));
    color: var(--code-block-destructive-foreground);
  }
}
</style>
