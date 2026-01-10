<script setup lang="ts">
import {
  AlertDialogContent,
  type AlertDialogContentEmits,
  type AlertDialogContentProps,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { useAttrs } from 'vue';

const props = defineProps<AlertDialogContentProps>();
const emits = defineEmits<AlertDialogContentEmits>();
const attrs = useAttrs();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay class="sigma-ui-alert-dialog-overlay" />
    <AlertDialogContent
      v-bind="forwarded"
      class="sigma-ui-alert-dialog-content"
      :class="attrs.class"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

<style>
.sigma-ui-alert-dialog-overlay {
  position: fixed;
  z-index: 50;
  background-color: rgb(0 0 0 / 80%);
  inset: 0;
}

.sigma-ui-alert-dialog-overlay[data-state='open'] {
  animation: sigma-ui-fade-in 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-alert-dialog-overlay[data-state='closed'] {
  animation: sigma-ui-fade-out 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-alert-dialog-content {
  position: fixed;
  z-index: 50;
  top: 50%;
  left: 50%;
  display: grid;
  width: 100%;
  max-width: 32rem;
  padding: 1.5rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  box-shadow: var(--shadow-lg);
  gap: 1rem;
  transform: translate(-50%, -50%);
  transition-duration: 200ms;
}

@media (width >= 640px) {
  .sigma-ui-alert-dialog-content {
    border-radius: var(--radius);
  }
}

.sigma-ui-alert-dialog-content[data-state='open'] {
  animation: sigma-ui-alert-dialog-show 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-alert-dialog-content[data-state='closed'] {
  animation: sigma-ui-alert-dialog-hide 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes sigma-ui-alert-dialog-show {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes sigma-ui-alert-dialog-hide {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
}
</style>
