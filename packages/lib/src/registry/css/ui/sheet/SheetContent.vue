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
  z-index: 50;
  background-color: rgb(0 0 0 / 80%);
  inset: 0;
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
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
  transition: all 0.3s ease-in-out;
}

.sigma-ui-sheet-content__base[data-state="open"] {
  animation-duration: 500ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-sheet-content__base[data-state="closed"] {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-sheet-content--top {
  top: 0;
  border-bottom: 1px solid hsl(var(--border));
  inset-inline: 0;
}

.sigma-ui-sheet-content--top[data-state="closed"] {
  animation-name: slide-out-to-top;
}

.sigma-ui-sheet-content--top[data-state="open"] {
  animation-name: slide-in-from-top;
}

.sigma-ui-sheet-content--bottom {
  bottom: 0;
  border-top: 1px solid hsl(var(--border));
  inset-inline: 0;
}

.sigma-ui-sheet-content--bottom[data-state="closed"] {
  animation-name: slide-out-to-bottom;
}

.sigma-ui-sheet-content--bottom[data-state="open"] {
  animation-name: slide-in-from-bottom;
}

.sigma-ui-sheet-content--left {
  left: 0;
  width: 75%;
  height: 100%;
  border-right: 1px solid hsl(var(--border));
  inset-block: 0;
}

.sigma-ui-sheet-content--left[data-state="closed"] {
  animation-name: slide-out-to-left;
}

.sigma-ui-sheet-content--left[data-state="open"] {
  animation-name: slide-in-from-left;
}

@media (width >= 640px) {
  .sigma-ui-sheet-content--left {
    max-width: 24rem;
  }
}

.sigma-ui-sheet-content--right {
  right: 0;
  width: 75%;
  height: 100%;
  border-left: 1px solid hsl(var(--border));
  inset-block: 0;
}

.sigma-ui-sheet-content--right[data-state="closed"] {
  animation-name: slide-out-to-right;
}

.sigma-ui-sheet-content--right[data-state="open"] {
  animation-name: slide-in-from-right;
}

@media (width >= 640px) {
  .sigma-ui-sheet-content--right {
    max-width: 24rem;
  }
}

.sigma-ui-sheet-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border-radius: var(--radius-sm);
  opacity: 0.7;
  transition: opacity 0.2s;
}

.sigma-ui-sheet-close:hover {
  opacity: 1;
}

.sigma-ui-sheet-close:focus {
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
  outline: none;
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

@keyframes overlay-show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes overlay-hide {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes slide-in-from-top {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-to-top {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
}

@keyframes slide-in-from-bottom {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-to-bottom {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes slide-in-from-left {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-to-left {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

@keyframes slide-in-from-right {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-to-right {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}
</style>
