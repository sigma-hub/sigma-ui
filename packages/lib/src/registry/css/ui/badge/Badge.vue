<script setup lang="ts">
import { type BadgeVariants, badgeVariants } from '.';

const props = defineProps<{
  variant?: BadgeVariants['variant'];

}>();
</script>

<template>
  <div :class="[badgeVariants({ variant }), $attrs.class]">
    <slot />
  </div>
</template>

<style>
.sigma-ui-badge {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-full);
  border: 1px solid hsl(var(--border));
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-badge:focus {
  outline: none;
  --ring-offset: 2px;
  --ring-width: 2px;
  box-shadow:
    0 0 0 var(--ring-offset) hsl(var(--background)),
    0 0 0 calc(var(--ring-offset) + var(--ring-width)) hsl(var(--ring));
}

.sigma-ui-badge--default {
  border-color: transparent;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.sigma-ui-badge--default:hover {
  background-color: hsl(var(--primary) / 0.8);
}

.sigma-ui-badge--secondary {
  border-color: transparent;
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.sigma-ui-badge--secondary:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.sigma-ui-badge--destructive {
  border-color: transparent;
  background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}

.sigma-ui-badge--destructive:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.sigma-ui-badge--outline {
  color: hsl(var(--foreground));
}
</style>
