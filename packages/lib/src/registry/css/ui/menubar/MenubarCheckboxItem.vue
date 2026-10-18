<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  MenubarCheckboxItem,
  type MenubarCheckboxItemEmits,
  type MenubarCheckboxItemProps,
  MenubarItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarCheckboxItemProps>();
const emits = defineEmits<MenubarCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarCheckboxItem
    data-slot="menubar-checkbox-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-menubar-checkbox-item"
    :class="[$attrs.class]"
  >
    <span class="sigma-ui-menubar-checkbox-item__indicator">
      <MenubarItemIndicator>
        <CheckIcon class="sigma-ui-menubar-checkbox-item__icon" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>

<style>
.sigma-ui-menubar-checkbox-item {
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

.sigma-ui-menubar-checkbox-item:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-menubar-checkbox-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-menubar-checkbox-item__indicator {
  position: absolute;
  left: calc(var(--spacing) * 2);
  display: flex;
  width: calc(var(--spacing) * 3.5);
  height: calc(var(--spacing) * 3.5);
  align-items: center;
  justify-content: center;
}

.sigma-ui-menubar-checkbox-item__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
