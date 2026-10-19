<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'reka-ui';
import { type ToggleVariants, toggleVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<ToggleProps & {
  /** Visual style of the toggle. */
  variant?: ToggleVariants['variant'];
  /** Height and horizontal padding of the toggle. */
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
    data-slot="toggle"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[toggleVariants({ variant, size }), $attrs.class]"
  >
    <slot />
  </Toggle>
</template>

<style>
@layer base, components;

@layer components {
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
    background-color: var(--muted);
    color: var(--muted-foreground);
  }

  .sigma-ui-toggle:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }

  .sigma-ui-toggle:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .sigma-ui-toggle[data-state="on"] {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-toggle--default {
    background-color: transparent;
  }

  .sigma-ui-toggle--outline {
    border: 1px solid var(--input);
    background-color: transparent;
  }

  .sigma-ui-toggle--outline:hover {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-toggle--size-default {
    height: calc(var(--spacing) * 10);
    padding-inline: calc(var(--spacing) * 3);
  }

  .sigma-ui-toggle--size-sm {
    height: calc(var(--spacing) * 9);
    padding-inline: calc(var(--spacing) * 2.5);
  }

  .sigma-ui-toggle--size-lg {
    height: calc(var(--spacing) * 11);
    padding-inline: calc(var(--spacing) * 5);
  }
}
</style>
