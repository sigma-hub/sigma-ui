<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  MenubarItemIndicator,
  MenubarRadioItem,
  type MenubarRadioItemEmits,
  type MenubarRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarRadioItemProps>();
const emits = defineEmits<MenubarRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRadioItem
    data-slot="menubar-radio-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-menubar-radio-item"
    :class="[$attrs.class]"
  >
    <span class="sigma-ui-menubar-radio-item__indicator">
      <MenubarItemIndicator>
        <CircleIcon class="sigma-ui-menubar-radio-item__icon" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarRadioItem>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-menubar-radio-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2) calc(var(--spacing) * 1.5) calc(var(--spacing) * 8);
    border-radius: var(--radius-sm);
    cursor: default;
    font-size: 0.875rem;
    outline: none;
    user-select: none;
  }

  .sigma-ui-menubar-radio-item:focus {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .sigma-ui-menubar-radio-item[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  .sigma-ui-menubar-radio-item__indicator {
    position: absolute;
    left: calc(var(--spacing) * 2);
    display: flex;
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
    align-items: center;
    justify-content: center;
  }

  .sigma-ui-menubar-radio-item__icon {
    width: calc(var(--spacing) * 2);
    height: calc(var(--spacing) * 2);
    fill: currentcolor;
  }
}
</style>
