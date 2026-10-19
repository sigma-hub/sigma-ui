<script setup lang="ts">
import { useAttrs } from 'vue';

import { type InputGroupVariants, inputGroupAddonVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface InputGroupAddonProps {
  /**
   * Where the addon sits relative to the control.
   */
  align?: InputGroupVariants['align'];
}

const props = withDefaults(defineProps<InputGroupAddonProps>(), {
  align: 'inline-start',
});

defineSlots<{
  /**
   * Icon, text, `Kbd`, or `InputGroupButton`.
   */
  default?: () => unknown;
}>();

function focusControl(event: MouseEvent) {
  const target = event.target;

  if (!(target instanceof Element) || target.closest('button')) {
    return;
  }

  const currentTarget = event.currentTarget;

  if (!(currentTarget instanceof HTMLElement)) {
    return;
  }

  currentTarget.parentElement?.querySelector<HTMLElement>('[data-slot="input-group-control"]')?.focus();
}
</script>

<template>
  <div
    data-slot="input-group-addon"
    v-bind="delegatedAttrs()"
    role="group"
    :data-align="props.align"
    :class="[inputGroupAddonVariants({ align: props.align }), $attrs.class]"
    @click="focusControl"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-input-group-addon {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
    color: var(--muted-foreground);
    cursor: text;
    font-size: 0.875rem;
    font-weight: 500;
    gap: calc(var(--spacing) * 2);
    padding-block: calc(var(--spacing) * 1.5);
    user-select: none;
  }

  .sigma-ui-input-group-addon svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    pointer-events: none;
  }

  .sigma-ui-input-group-addon--inline-start {
    order: -1;
    padding-left: calc(var(--spacing) * 3);
  }

  .sigma-ui-input-group-addon--inline-start:has(> button) {
    margin-left: calc(var(--spacing) * -1.5);
  }

  .sigma-ui-input-group-addon--inline-end {
    order: 1;
    padding-right: calc(var(--spacing) * 3);
  }

  .sigma-ui-input-group-addon--inline-end:has(> button) {
    margin-right: calc(var(--spacing) * -1.5);
  }

  .sigma-ui-input-group-addon--block-start,
  .sigma-ui-input-group-addon--block-end {
    width: 100%;
    justify-content: flex-start;
    padding-inline: calc(var(--spacing) * 3);
  }

  .sigma-ui-input-group-addon--block-start {
    order: -1;
    padding-top: calc(var(--spacing) * 3);
  }

  .sigma-ui-input-group-addon--block-end {
    order: 1;
    padding-bottom: calc(var(--spacing) * 3);
  }
}
</style>
