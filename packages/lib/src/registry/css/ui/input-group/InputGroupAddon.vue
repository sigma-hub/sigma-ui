<script setup lang="ts">
import { type InputGroupVariants, inputGroupAddonVariants } from '.';

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
    role="group"
    data-slot="input-group-addon"
    :data-align="props.align"
    :class="[inputGroupAddonVariants({ align: props.align }), $attrs.class]"
    @click="focusControl"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-input-group-addon {
  display: flex;
  height: auto;
  align-items: center;
  justify-content: center;
  color: var(--muted-foreground);
  cursor: text;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
  padding-block: 0.375rem;
  user-select: none;
}

.sigma-ui-input-group-addon svg {
  width: 1rem;
  height: 1rem;
  pointer-events: none;
}

.sigma-ui-input-group-addon--inline-start {
  order: -1;
  padding-left: 0.75rem;
}

.sigma-ui-input-group-addon--inline-start:has(> button) {
  margin-left: -0.375rem;
}

.sigma-ui-input-group-addon--inline-end {
  order: 1;
  padding-right: 0.75rem;
}

.sigma-ui-input-group-addon--inline-end:has(> button) {
  margin-right: -0.375rem;
}

.sigma-ui-input-group-addon--block-start,
.sigma-ui-input-group-addon--block-end {
  width: 100%;
  justify-content: flex-start;
  padding-inline: 0.75rem;
}

.sigma-ui-input-group-addon--block-start {
  order: -1;
  padding-top: 0.75rem;
}

.sigma-ui-input-group-addon--block-end {
  order: 1;
  padding-bottom: 0.75rem;
}
</style>
