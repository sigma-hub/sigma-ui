<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
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
    v-bind="delegatedAttrs()"
    role="group"
    data-slot="input-group-addon"
    :data-align="props.align"
    :class="cn(inputGroupAddonVariants({ align: props.align }), $attrs.class ?? '')"
    @click="focusControl"
  >
    <slot />
  </div>
</template>
