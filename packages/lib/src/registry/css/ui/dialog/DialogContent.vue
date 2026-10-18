<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { XIcon } from 'lucide-vue-next';
import { reactiveOmit } from '@vueuse/core';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<DialogContentProps & {
  closeLabel?: string;
}>(), {
  closeLabel: 'Close',
});
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'closeLabel'), emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="sigma-ui-dialog-overlay" />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      class="sigma-ui-dialog-content"
      :class="[$attrs.class]"
    >
      <slot />

      <DialogClose class="sigma-ui-dialog-close">
        <XIcon class="sigma-ui-dialog-close__icon" />
        <span class="sigma-ui-dialog-close__label">{{ closeLabel }}</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style>
.sigma-ui-dialog-overlay {
  position: fixed;
  z-index: 50;
  animation: sigma-ui-fade-in 0.2s ease-out;
  background-color: rgb(0 0 0 / 80%);
  inset: 0;
}

.sigma-ui-dialog-overlay[data-state="open"] {
  animation: sigma-ui-fade-in 0.2s ease-out;
}

.sigma-ui-dialog-overlay[data-state="closed"] {
  animation: sigma-ui-fade-out 0.2s ease-in;
}

.sigma-ui-dialog-content {
  position: fixed;
  z-index: 50;
  top: 50%;
  left: 50%;
  display: grid;
  width: 100%;
  max-width: 32rem;
  padding: calc(var(--spacing) * 6);
  border: 1px solid var(--border);
  background-color: var(--background);
  box-shadow: var(--shadow-lg);
  gap: calc(var(--spacing) * 4);
  transform: translate(-50%, -50%);
  transition-duration: 200ms;
}

.sigma-ui-dialog-content[data-state="open"] {
  animation: sigma-ui-dialog-show 0.2s ease-out;
}

.sigma-ui-dialog-content[data-state="closed"] {
  animation: sigma-ui-dialog-hide 0.2s ease-in;
}

.sigma-ui-dialog-close {
  position: absolute;
  top: calc(var(--spacing) * 4);
  right: calc(var(--spacing) * 4);
  border-radius: var(--radius-sm);
  opacity: 0.7;
  transition-duration: 150ms;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-dialog-close:hover {
  opacity: 1;
}

.sigma-ui-dialog-close:focus {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-dialog-close[data-state="open"] {
  background-color: var(--secondary);
  color: var(--muted-foreground);
}

.sigma-ui-dialog-close:disabled {
  pointer-events: none;
}

.sigma-ui-dialog-close__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.sigma-ui-dialog-close__label {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  border-width: 0;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@keyframes sigma-ui-dialog-show {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes sigma-ui-dialog-hide {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
}

@media (width >= 40rem) {
  .sigma-ui-dialog-content {
    border-radius: var(--radius-lg);
  }
}
</style>
