<script setup lang="ts">
import { useAttrs } from 'vue';
import { type AlertVariants, alertVariants } from '.';

const { variant } = defineProps<{
  variant?: AlertVariants['variant'];
}>();
const attrs = useAttrs();
</script>

<template>
  <div
    class="sigma-ui-alert"
    :class="[alertVariants({ variant }), attrs.class]"
    role="alert"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-alert {
  position: relative;
  width: 100%;
  padding: 1rem;
  border-width: 1px;
  border-radius: var(--radius);
}

.sigma-ui-alert > svg ~ * {
  padding-left: 1.75rem;
}

.sigma-ui-alert > svg + div {
  transform: translateY(-3px);
}

.sigma-ui-alert > svg {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: hsl(var(--foreground));
}

.sigma-ui-alert-default {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

.sigma-ui-alert-destructive {
  border-color: hsl(var(--destructive) / 50%);
  color: hsl(var(--destructive));
}

.dark .sigma-ui-alert-destructive {
  border-color: hsl(var(--destructive));
  background-color: hsl(var(--destructive) / 20%);
  color: hsl(var(--red-500));
}

.sigma-ui-alert-destructive > svg {
  color: hsl(var(--red-500));
}
</style>
