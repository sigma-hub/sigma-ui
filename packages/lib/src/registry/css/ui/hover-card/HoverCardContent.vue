<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  HoverCardContent,
  type HoverCardContentProps,
  HoverCardPortal,
  useForwardProps,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(
  defineProps<HoverCardContentProps>(),
  {
    sideOffset: 4,
  },
);

const forwardedProps = useForwardProps(props);
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="hover-card-content"
      v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
      class="sigma-ui-hover-card-content"
      :class="$attrs.class"
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-hover-card-content {
    z-index: 50;
    padding: calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
    background-color: var(--popover);
    box-shadow: var(--shadow-md);
    color: var(--popover-foreground);
    outline: none;
    transform-origin: var(--reka-popper-transform-origin);
  }

  .sigma-ui-hover-card-content[data-state="open"] {
    animation: sigma-ui-fade-in-scale 200ms ease-out;
  }
}
</style>
