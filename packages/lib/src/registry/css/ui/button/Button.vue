<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { Loader2Icon } from 'lucide-vue-next';
import { type ButtonVariants, buttonVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface Props extends PrimitiveProps {
  /** Visual style of the button. */
  variant?: ButtonVariants['variant'];
  /** Height and padding preset. `icon`, `icon-xs`, `icon-sm`, and `icon-lg` make a square button. */
  size?: ButtonVariants['size'];
  /** Shows a spinner and disables the button. */
  isLoading?: boolean;
  /** Text that replaces the button content while loading; the content stays visible when empty. */
  loadingText?: string;
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  isLoading: false,
  loadingText: '',
});
</script>

<template>
  <Primitive
    data-slot="button"
    v-bind="delegatedAttrs()"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="[buttonVariants({ variant, size }), $attrs.class]"
    :disabled="isLoading || $attrs.disabled"
  >
    <Loader2Icon
      v-if="isLoading"
      class="sigma-ui-button__loader"
    />
    <template v-if="!isLoading || (isLoading && !loadingText)">
      <slot />
    </template>
    <template v-else>
      {{ loadingText }}
    </template>
  </Primitive>
</template>

<style>
.sigma-ui-button {
  display: inline-flex;
  width: fit-content;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
  transition: background-color 0.1s ease, colors 0.2s;
  user-select: none;
  white-space: nowrap;
}

.sigma-ui-button svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  pointer-events: none;
}

.sigma-ui-button[aria-invalid="true"] {
  border-color: var(--destructive);
}

.sigma-ui-button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-button:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-button--default {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.sigma-ui-button--default:hover {
  background-color: color-mix(in oklch, var(--primary) 90%, transparent);
}

.sigma-ui-button--destructive {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

.sigma-ui-button--destructive:hover {
  background-color: color-mix(in oklch, var(--destructive) 90%, transparent);
}

.sigma-ui-button--outline {
  border: 1px solid var(--border);
  background-color: transparent;
}

.sigma-ui-button--outline:hover {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-button--secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-button--secondary:hover {
  background-color: color-mix(in oklch, var(--secondary) 80%, transparent);
}

.sigma-ui-button--ghost:hover {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-button--link {
  color: var(--primary);
  text-underline-offset: 4px;
}

.sigma-ui-button--link:hover {
  text-decoration: underline;
}

.sigma-ui-button--size-default {
  height: 2.25rem;
  padding-inline: 1rem;
}

.sigma-ui-button--size-default:has(> svg) {
  padding-inline: 0.75rem;
}

.sigma-ui-button--size-xs {
  height: 1.5rem;
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  gap: 0.25rem;
  padding-inline: 0.5rem;
}

.sigma-ui-button--size-xs:has(> svg) {
  padding-inline: 0.375rem;
}

.sigma-ui-button--size-xs svg,
.sigma-ui-button--size-icon-xs svg {
  width: 0.75rem;
  height: 0.75rem;
}

.sigma-ui-button--size-sm {
  height: 2rem;
  gap: 0.375rem;
  padding-inline: 0.75rem;
}

.sigma-ui-button--size-sm:has(> svg) {
  padding-inline: 0.625rem;
}

.sigma-ui-button--size-lg {
  height: 2.5rem;
  padding-inline: 1.5rem;
}

.sigma-ui-button--size-lg:has(> svg) {
  padding-inline: 1rem;
}

.sigma-ui-button--size-icon {
  width: 2.25rem;
  height: 2.25rem;
}

.sigma-ui-button--size-icon-xs {
  width: 1.5rem;
  height: 1.5rem;
}

.sigma-ui-button--size-icon-sm {
  width: 2rem;
  height: 2rem;
}

.sigma-ui-button--size-icon-lg {
  width: 2.5rem;
  height: 2.5rem;
}

.sigma-ui-button__loader {
  width: 1rem;
  height: 1rem;
  animation: sigma-ui-spin 1s linear infinite;
}

@keyframes sigma-ui-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
