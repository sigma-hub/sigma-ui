<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { type TypographyVariants, typographyVariants } from '.';

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
    :class="[typographyVariants({ variant: props.variant }), $attrs.class]"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-typography {
  color: var(--foreground);
}

.sigma-ui-typography--h1 {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
  scroll-margin-top: 5rem;
}

@media (width >= 1024px) {
  .sigma-ui-typography--h1 {
    font-size: 3rem;
  }
}

.sigma-ui-typography--h2 {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
  margin-top: 2.5rem;
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  scroll-margin-top: 5rem;
  transition-duration: 150ms;
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-typography--h2:first-child {
  margin-top: 0;
}

.sigma-ui-typography--h3 {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  scroll-margin-top: 5rem;
}

.sigma-ui-typography--h4 {
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  scroll-margin-top: 5rem;
}

.sigma-ui-typography--p {
  line-height: 1.75;
}

.sigma-ui-typography--p:not(:first-child) {
  margin-top: 1.5rem;
}

.sigma-ui-typography--blockquote {
  padding-left: 1.5rem;
  border-left: 2px solid var(--border);
  margin-top: 1.5rem;
  font-style: italic;
}

.sigma-ui-typography--list {
  margin: 1.5rem 0 1.5rem 1.5rem;
  list-style-type: disc;
}

.sigma-ui-typography--list > li {
  margin-top: 0.5rem;
}

.sigma-ui-typography--code {
  position: relative;
  padding: 0.2rem 0.3rem;
  border-radius: calc(var(--radius) - 4px);
  background-color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875rem;
  font-weight: 600;
}

.sigma-ui-typography--lead {
  color: var(--muted-foreground);
  font-size: 1.25rem;
}

.sigma-ui-typography--large {
  font-size: 1.125rem;
  font-weight: 600;
}

.sigma-ui-typography--small {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.sigma-ui-typography--muted {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.sigma-ui-typography--link {
  color: var(--primary);
  font-weight: 500;
  text-decoration-line: underline;
  text-underline-offset: 4px;
}

.sigma-ui-typography--table {
  width: 100%;
}

.sigma-ui-typography--table tr {
  border-top: 1px solid var(--border);
}

.sigma-ui-typography--table tr:nth-child(even) {
  background-color: var(--muted);
}

.sigma-ui-typography--table th,
.sigma-ui-typography--table td {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  text-align: left;
}

.sigma-ui-typography--table th {
  font-weight: 700;
}
</style>
