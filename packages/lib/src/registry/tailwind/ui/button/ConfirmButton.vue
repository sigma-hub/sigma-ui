<script setup lang="ts">
import { ref } from 'vue';
import { CheckIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { Button } from '.';
import { type ButtonVariants } from '.';

interface Props {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  confirmDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'default',
  confirmDuration: 1000,
});

const emit = defineEmits<{
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
    :class="cn(
      'relative overflow-hidden gap-2',
      isConfirmed && 'border-green-500/50',
    )"
    @click="handleClick"
  >
    <span
      :class="cn(
        'inline-flex items-center gap-2 transition-opacity duration-150',
        isConfirmed && 'opacity-0',
      )"
    >
      <slot />
    </span>
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 scale-50"
      leave-to-class="opacity-0 scale-50"
    >
      <span
        v-if="isConfirmed"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center"
      >
        <CheckIcon
          :size="14"
          class="text-green-500"
        />
      </span>
    </Transition>
  </Button>
</template>
