<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useAttrs, useId } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { useCodeBlockContext } from '@ui/registry/shared/ui/code-block/code-block-state';
import { cn } from '@ui/utils';
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
    :id="id"
    data-slot="code-block-title"
    v-bind="delegatedAttrs()"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'min-w-0 truncate font-medium text-foreground [&_a]:text-inherit [&_a]:no-underline [&_a:hover]:underline [&_a:hover]:underline-offset-4 [&_svg]:pointer-events-none [&_svg]:mr-1.5 [&_svg]:inline-block [&_svg]:size-3.5 [&_svg]:-translate-y-px [&_svg]:align-middle [&_svg]:text-muted-foreground',
      'in-data-[variant=destructive]:text-(color:--code-block-destructive-foreground) in-data-[variant=destructive]:[&_svg]:text-(color:--code-block-destructive-foreground)',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </Primitive>
</template>
