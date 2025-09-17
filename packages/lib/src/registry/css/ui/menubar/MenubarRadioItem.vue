<script setup lang="ts">
import {
  MenubarItemIndicator,
  MenubarRadioItem,
  type MenubarRadioItemEmits,
  type MenubarRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';

const props = defineProps<MenubarRadioItemProps>();
const emits = defineEmits<MenubarRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRadioItem
    v-bind="forwarded"
    class="sigma-ui-menubar-radio-item"
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
.sigma-ui-menubar-radio-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  outline: none;
  user-select: none;
}

.sigma-ui-menubar-radio-item:focus {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.sigma-ui-menubar-radio-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-menubar-radio-item__indicator {
  position: absolute;
  left: 0.5rem;
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-menubar-radio-item__icon {
  width: 0.5rem;
  height: 0.5rem;
  fill: currentcolor;
}
</style>
