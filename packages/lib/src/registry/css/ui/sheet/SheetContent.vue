<script setup lang="ts">
import { computed } from 'vue';
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
import { type SheetVariants, sheetVariants } from '.';

interface SheetContentProps extends DialogContentProps {
  side?: SheetVariants['side'];
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<SheetContentProps>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => ({ ...props, side: undefined }));
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="sigma-ui-sheet-overlay" />
    <DialogContent
      :class="[sheetVariants({ side }), $attrs.class]"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />

      <DialogClose class="sigma-ui-sheet-close">
        <XIcon class="sigma-ui-sheet-close__icon" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style>
.sigma-ui-sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);
}

.sigma-ui-sheet-overlay[data-state="open"] {
  animation: overlayShow 150ms ease-out;
}

.sigma-ui-sheet-overlay[data-state="closed"] {
  animation: overlayHide 150ms ease-in;
}

.sigma-ui-sheet-content__base {
  position: fixed;
  z-index: 50;
  padding: 1.5rem;
  background-color: hsl(var(--background));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.sigma-ui-sheet-content__base[data-state="open"] {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-duration: 500ms;
}

.sigma-ui-sheet-content__base[data-state="closed"] {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-duration: 300ms;
}

.sigma-ui-sheet-content--top {
  inset-inline: 0;
  top: 0;
  border-bottom: 1px solid hsl(var(--border));
}

.sigma-ui-sheet-content--top[data-state="closed"] {
  animation-name: slideOutToTop;
}

.sigma-ui-sheet-content--top[data-state="open"] {
  animation-name: slideInFromTop;
}

.sigma-ui-sheet-content--bottom {
  inset-inline: 0;
  bottom: 0;
  border-top: 1px solid hsl(var(--border));
}

.sigma-ui-sheet-content--bottom[data-state="closed"] {
  animation-name: slideOutToBottom;
}

.sigma-ui-sheet-content--bottom[data-state="open"] {
  animation-name: slideInFromBottom;
}

.sigma-ui-sheet-content--left {
  inset-block: 0;
  left: 0;
  height: 100%;
  width: 75%;
  border-right: 1px solid hsl(var(--border));
}

.sigma-ui-sheet-content--left[data-state="closed"] {
  animation-name: slideOutToLeft;
}

.sigma-ui-sheet-content--left[data-state="open"] {
  animation-name: slideInFromLeft;
}

@media (min-width: 640px) {
  .sigma-ui-sheet-content--left {
    max-width: 24rem;
  }
}

.sigma-ui-sheet-content--right {
  inset-block: 0;
  right: 0;
  height: 100%;
  width: 75%;
  border-left: 1px solid hsl(var(--border));
}

.sigma-ui-sheet-content--right[data-state="closed"] {
  animation-name: slideOutToRight;
}

.sigma-ui-sheet-content--right[data-state="open"] {
  animation-name: slideInFromRight;
}

@media (min-width: 640px) {
  .sigma-ui-sheet-content--right {
    max-width: 24rem;
  }
}

.sigma-ui-sheet-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: var(--radius-sm);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.sigma-ui-sheet-close:hover {
  opacity: 1;
}

.sigma-ui-sheet-close:focus {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
}

.sigma-ui-sheet-close:disabled {
  pointer-events: none;
}

.sigma-ui-sheet-close[data-state="open"] {
  background-color: hsl(var(--secondary));
}

.sigma-ui-sheet-close__icon {
  width: 1rem;
  height: 1rem;
  color: hsl(var(--muted-foreground));
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes overlayHide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideInFromTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideOutToTop {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes slideInFromBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideOutToBottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
