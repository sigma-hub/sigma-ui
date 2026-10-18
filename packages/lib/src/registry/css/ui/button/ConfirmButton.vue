<script setup lang="ts">
import { ref } from 'vue';
import { CheckIcon } from 'lucide-vue-next';
import { Button } from '.';
import { type ButtonVariants } from '.';

interface Props {
  /** Visual style of the button. */
  variant?: ButtonVariants['variant'];
  /** Height and padding preset; icon makes a square button. */
  size?: ButtonVariants['size'];
  /** Milliseconds the checkmark stays visible after a click. */
  confirmDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'default',
  confirmDuration: 1000,
});

const emit = defineEmits<{
  /** Emitted on click; clicks while the checkmark is showing are ignored. */
  click: [event: MouseEvent];
}>();

const isConfirmed = ref(false);
let confirmTimeout: ReturnType<typeof setTimeout> | null = null;

async function handleClick(event: MouseEvent) {
  if (isConfirmed.value) {
    return;
  }

  emit('click', event);

  isConfirmed.value = true;

  if (confirmTimeout) {
    clearTimeout(confirmTimeout);
  }

  confirmTimeout = setTimeout(() => {
    isConfirmed.value = false;
    confirmTimeout = null;
  }, props.confirmDuration);
}
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    class="sigma-ui-confirm-button"
    :class="{ 'sigma-ui-confirm-button--confirmed': isConfirmed }"
    data-slot="confirm-button"
    @click="handleClick"
  >
    <span
      class="sigma-ui-confirm-button__content"
      :class="{ 'sigma-ui-confirm-button__content--hidden': isConfirmed }"
    >
      <slot />
    </span>
    <Transition name="sigma-ui-confirm-button-check">
      <span
        v-if="isConfirmed"
        class="sigma-ui-confirm-button__check-wrapper"
      >
        <CheckIcon
          :size="14"
          class="sigma-ui-confirm-button__check"
        />
      </span>
    </Transition>
  </Button>
</template>

<style>
.sigma-ui-confirm-button {
  position: relative;
  overflow: hidden;
  gap: calc(var(--spacing) * 2);
}

.sigma-ui-confirm-button__content {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  transition: opacity 0.15s ease;
}

.sigma-ui-confirm-button__content--hidden {
  opacity: 0;
}

.sigma-ui-confirm-button__check-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
}

.sigma-ui-confirm-button__check {
  color: var(--success, oklch(62.3% 0.169 149.178deg));
}

.sigma-ui-confirm-button--confirmed {
  border-color: color-mix(in oklch, var(--success, oklch(62.3% 0.169 149.178deg)) 50%, transparent);
}

.sigma-ui-confirm-button-check-enter-active,
.sigma-ui-confirm-button-check-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.sigma-ui-confirm-button-check-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
}

.sigma-ui-confirm-button-check-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
}
</style>
