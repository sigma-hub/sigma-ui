<script setup lang="ts">
import { TooltipContent, type TooltipContentEmits, type TooltipContentProps, TooltipPortal, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TooltipContentProps>(), {
  sideOffset: 4,
});

const emits = defineEmits<TooltipContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      class="sigma-ui-tooltip-content"
      :class="[$attrs.class]"
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>

<style>
.sigma-ui-tooltip-content {
  z-index: 50;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sigma-ui-tooltip-content {
  animation: tooltipIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sigma-ui-tooltip-content[data-side="bottom"] {
  animation: tooltipInBottom 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sigma-ui-tooltip-content[data-side="top"] {
  animation: tooltipInTop 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sigma-ui-tooltip-content[data-side="left"] {
  animation: tooltipInLeft 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sigma-ui-tooltip-content[data-side="right"] {
  animation: tooltipInRight 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sigma-ui-tooltip-content[data-state="closed"] {
  animation: tooltipOut 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes tooltipIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes tooltipOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes tooltipInBottom {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tooltipInTop {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tooltipInLeft {
  from {
    opacity: 0;
    transform: translateX(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes tooltipInRight {
  from {
    opacity: 0;
    transform: translateX(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
