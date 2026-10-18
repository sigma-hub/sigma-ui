<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { type TypographyVariants, typographyVariants } from '.';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

type TypographyVariant = NonNullable<TypographyVariants['variant']>;

interface TypographyProps extends PrimitiveProps {
  /**
   * Text style. Also chooses the element when `as` is omitted.
   */
  variant?: TypographyVariants['variant'];
}

const props = withDefaults(defineProps<TypographyProps>(), {
  variant: 'p',
});

const variant = computed((): TypographyVariant => props.variant ?? 'p');

const element = computed(() => {
  if (props.as) {
    return props.as;
  }

  switch (variant.value) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'p':
      return 'p';
    case 'blockquote':
      return 'blockquote';
    case 'list':
      return 'ul';
    case 'code':
      return 'code';
    case 'lead':
      return 'p';
    case 'large':
      return 'div';
    case 'small':
      return 'small';
    case 'muted':
      return 'p';
    case 'link':
      return 'a';
    case 'table':
      return 'table';
    default:
      return variant.value satisfies never;
  }
});

defineSlots<{
  /**
   * Text or other content for this style.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    data-slot="typography"
    v-bind="delegatedAttrs()"
    :as="element"
    :as-child="props.asChild"
    :class="cn(typographyVariants({ variant: props.variant }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
