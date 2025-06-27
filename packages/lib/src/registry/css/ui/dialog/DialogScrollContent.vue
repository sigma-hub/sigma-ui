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
    <DialogOverlay
      class="sigma-ui-dialog-scroll-overlay"
    >
      <DialogContent
        class="sigma-ui-dialog-scroll-content"
        :class="[$attrs.class]"
        v-bind="forwarded"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;
          if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose class="sigma-ui-dialog-scroll-close">
          <XIcon class="sigma-ui-dialog-scroll-close__icon" />
          <span class="sigma-ui-dialog-scroll-close__label">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

<style>
.sigma-ui-dialog-scroll-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background-color: rgb(0 0 0 / 0.8);
  animation: fade-in 0.2s ease-out;
}

.sigma-ui-dialog-scroll-overlay[data-state="open"] {
  animation: fade-in 0.2s ease-out;
}

.sigma-ui-dialog-scroll-overlay[data-state="closed"] {
  animation: fade-out 0.2s ease-in;
}

.sigma-ui-dialog-scroll-content {
  position: relative;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  margin: 2rem 0;
  gap: 1rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 1.5rem;
  box-shadow: var(--shadow-lg);
  transition-duration: 200ms;
}

.sigma-ui-dialog-scroll-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.125rem;
  border-radius: var(--radius-md);
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-dialog-scroll-close:hover {
  background-color: hsl(var(--secondary));
}

.sigma-ui-dialog-scroll-close__icon {
  width: 1rem;
  height: 1rem;
}

.sigma-ui-dialog-scroll-close__label {
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

@media (min-width: 640px) {
  .sigma-ui-dialog-scroll-content {
    border-radius: var(--radius-lg);
  }
}

@media (min-width: 768px) {
  .sigma-ui-dialog-scroll-content {
    width: 100%;
  }
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
</style>
