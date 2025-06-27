<script setup lang="ts">
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

const props = defineProps<DialogContentProps>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="sigma-ui-dialog-overlay" />
    <DialogContent
      v-bind="forwarded"
      class="sigma-ui-dialog-content"
      :class="[$attrs.class]"
    >
      <slot />

      <DialogClose class="sigma-ui-dialog-close">
        <XIcon class="sigma-ui-dialog-close__icon" />
        <span class="sigma-ui-dialog-close__label">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style>
.sigma-ui-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgb(0 0 0 / 0.8);
  animation: fade-in 0.2s ease-out;
}

.sigma-ui-dialog-overlay[data-state="open"] {
  animation: fade-in 0.2s ease-out;
}

.sigma-ui-dialog-overlay[data-state="closed"] {
  animation: fade-out 0.2s ease-in;
}

.sigma-ui-dialog-content {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  gap: 1rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
  transition-duration: 200ms;
}

.sigma-ui-dialog-content[data-state="open"] {
  animation: dialog-show 0.2s ease-out;
}

.sigma-ui-dialog-content[data-state="closed"] {
  animation: dialog-hide 0.2s ease-in;
}

.sigma-ui-dialog-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: var(--radius-sm);
  opacity: 0.7;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-dialog-close:hover {
  opacity: 1;
}

.sigma-ui-dialog-close:focus {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
}

.sigma-ui-dialog-close[data-state="open"] {
  background-color: hsl(var(--accent));
  color: hsl(var(--muted-foreground));
}

.sigma-ui-dialog-close:disabled {
  pointer-events: none;
}

.sigma-ui-dialog-close__icon {
  width: 1rem;
  height: 1rem;
}

.sigma-ui-dialog-close__label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes dialog-show {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes dialog-hide {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
}

@media (min-width: 640px) {
  .sigma-ui-dialog-content {
    border-radius: var(--radius-lg);
  }
}
</style>
