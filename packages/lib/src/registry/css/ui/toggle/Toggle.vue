<script setup lang="ts">
import { computed } from 'vue';
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'reka-ui';
import { type ToggleVariants, toggleVariants } from '.';

const props = withDefaults(defineProps<ToggleProps & {
  variant?: ToggleVariants['variant'];
  size?: ToggleVariants['size'];
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
});

const emits = defineEmits<ToggleEmits>();

const delegatedProps = computed(() => ({ ...props, size: undefined, variant: undefined }));

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :class="[toggleVariants({ variant, size })]"
  >
    <slot />
  </Toggle>
</template>

<style>
.sigma-ui-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  transition-duration: 150ms;
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-toggle:hover {
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.sigma-ui-toggle:focus-visible {
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
  outline: none;
}

.sigma-ui-toggle:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-toggle[data-state="on"] {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-toggle--default {
  background-color: transparent;
}

.sigma-ui-toggle--outline {
  border: 1px solid hsl(var(--input));
  background-color: transparent;
}

.sigma-ui-toggle--outline:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-toggle--size-default {
  height: 2.5rem;
  padding-inline: 0.75rem;
}

.sigma-ui-toggle--size-sm {
  height: 2.25rem;
  padding-inline: 0.625rem;
}

.sigma-ui-toggle--size-lg {
  height: 2.75rem;
  padding-inline: 1.25rem;
}
</style>
