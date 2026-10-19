<script setup lang="ts">
import { useAttrs } from 'vue';

import { type BadgeVariants, badgeVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<{
  /** Visual style of the badge. */
  variant?: BadgeVariants['variant'];

}>();
</script>

<template>
  <div
    data-slot="badge"
    v-bind="delegatedAttrs()"
    :class="[badgeVariants({ variant }), $attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-badge {
    display: inline-flex;
    align-items: center;
    padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 2.5);
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    transition-duration: 150ms;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sigma-ui-badge:focus {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }

  .sigma-ui-badge--default {
    border-color: transparent;
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .sigma-ui-badge--default:hover {
    background-color: color-mix(in oklch, var(--primary) 80%, transparent);
  }

  .sigma-ui-badge--secondary {
    border-color: transparent;
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-badge--secondary:hover {
    background-color: color-mix(in oklch, var(--secondary) 80%, transparent);
  }

  .sigma-ui-badge--destructive {
    border-color: transparent;
    background-color: var(--destructive);
    color: var(--destructive-foreground);
  }

  .sigma-ui-badge--destructive:hover {
    background-color: color-mix(in oklch, var(--destructive) 80%, transparent);
  }

  .sigma-ui-badge--outline {
    color: var(--foreground);
  }
}
</style>
