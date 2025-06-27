<script setup lang="ts">
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,

} from 'reka-ui';

const props = defineProps<SwitchRootProps>();

const emits = defineEmits<SwitchRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    class="sigma-ui-switch"
  >
    <SwitchThumb class="sigma-ui-switch__thumb" />
  </SwitchRoot>
</template>

<style>
.sigma-ui-switch {
  display: inline-flex;
  height: 1.5rem;
  width: 2.75rem;
  flex-shrink: 0;
  cursor: pointer;
  align-items: center;
  border-radius: var(--radius-full);
  border: 2px solid transparent;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-switch:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
}

.sigma-ui-switch:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.sigma-ui-switch[data-state="checked"] {
  background-color: hsl(var(--primary));
}

.sigma-ui-switch[data-state="unchecked"] {
  background-color: hsl(var(--input));
}

.sigma-ui-switch__thumb {
  pointer-events: none;
  display: block;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: var(--radius-full);
  background-color: hsl(var(--background));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  animation: none;
}

.sigma-ui-switch__thumb[data-state="checked"] {
  transform: translateX(1.25rem);
  animation: thumbMotionBlurIn 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-switch__thumb[data-state="unchecked"] {
  transform: translateX(0);
  animation: thumbMotionBlurOut 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes thumbMotionBlurIn {
  0% {
    filter: blur(0);
  }
  50% {
    filter: blur(2px);
  }
  100% {
    filter: blur(0);
  }
}

@keyframes thumbMotionBlurOut {
  0% {
    filter: blur(0);
  }
  50% {
    filter: blur(2px);
  }
  100% {
    filter: blur(0);
  }
}
</style>
