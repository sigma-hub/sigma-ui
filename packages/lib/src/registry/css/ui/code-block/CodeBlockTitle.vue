<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useAttrs, useId } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { useCodeBlockContext } from '@ui/registry/shared/ui/code-block/code-block-state';
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
  /** A file name or a label, with an optional leading icon. Long titles truncate. */
  default?: () => unknown;
}>();

const context = useCodeBlockContext();
const generatedId = useId();
const id = computed(() => (attrs.id as string | undefined) ?? generatedId);

onMounted(() => {
  if (context) {
    context.titleId.value = id.value;
  }
});

onBeforeUnmount(() => {
  if (context?.titleId.value === id.value) {
    context.titleId.value = undefined;
  }
});
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs()"
    :id="id"
    :as="props.as"
    :as-child="props.asChild"
    data-slot="code-block-title"
    class="sigma-ui-code-block__title"
    :class="[$attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-code-block__title {
  overflow: hidden;
  min-width: 0;
  color: var(--foreground);
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sigma-ui-code-block__title svg {
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.375rem;
  color: var(--muted-foreground);
  pointer-events: none;
  vertical-align: -0.125rem;
}

.sigma-ui-code-block__title a {
  color: inherit;
  text-decoration: none;
}

.sigma-ui-code-block__title a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

[data-variant='destructive'] .sigma-ui-code-block__title,
[data-variant='destructive'] .sigma-ui-code-block__title svg {
  color: var(--code-block-destructive-foreground);
}
</style>
