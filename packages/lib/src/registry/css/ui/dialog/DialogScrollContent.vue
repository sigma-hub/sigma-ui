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
import { XIcon } from '@lucide/vue';
import { reactiveOmit } from '@vueuse/core';

const props = withDefaults(defineProps<DialogContentProps & {
  closeLabel?: string;
}>(), {
  closeLabel: 'Close',
});
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'closeLabel'), emits);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="sigma-ui-dialog-scroll-overlay"
    >
      <DialogContent
        data-slot="dialog-scroll-content"
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
          <span class="sigma-ui-dialog-scroll-close__label">{{ closeLabel }}</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>

<style>
.sigma-ui-dialog-scroll-overlay {
  position: fixed;
  z-index: 50;
  display: grid;
  animation: sigma-ui-fade-in 0.2s ease-out;
  background-color: rgb(0 0 0 / 80%);
  inset: 0;
  overflow-y: auto;
  place-items: center;
}

.sigma-ui-dialog-scroll-overlay[data-state="open"] {
  animation: sigma-ui-fade-in 0.2s ease-out;
}

.sigma-ui-dialog-scroll-overlay[data-state="closed"] {
  animation: sigma-ui-fade-out 0.2s ease-in;
}

.sigma-ui-dialog-scroll-content {
  position: relative;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  padding: calc(var(--spacing) * 6);
  border: 1px solid var(--border);
  margin: calc(var(--spacing) * 8) 0;
  background-color: var(--background);
  box-shadow: var(--shadow-lg);
  gap: calc(var(--spacing) * 4);
  transition-duration: 200ms;
}

.sigma-ui-dialog-scroll-close {
  position: absolute;
  top: calc(var(--spacing) * 3);
  right: calc(var(--spacing) * 3);
  padding: calc(var(--spacing) * 0.5);
  border-radius: var(--radius-md);
  transition-duration: 150ms;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-dialog-scroll-close:hover {
  background-color: var(--secondary);
}

.sigma-ui-dialog-scroll-close__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.sigma-ui-dialog-scroll-close__label {
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

@media (width >= 40rem) {
  .sigma-ui-dialog-scroll-content {
    border-radius: var(--radius-lg);
  }
}

@media (width >= 48rem) {
  .sigma-ui-dialog-scroll-content {
    width: 100%;
  }
}

</style>
