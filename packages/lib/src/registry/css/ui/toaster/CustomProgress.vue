<script lang="ts" setup>
import { Button } from '@ui/registry/css/ui/button';

export type ToastItem = {
  /** Toast content and progress state; `progress` is a percentage from 0 to 100 and the counter is hidden once it reaches 100. */
  data: {
    id: number | string;
    title: string;
    description: string;
    progress: number;
    timer: number;
    actionText: string;
    cleanup: () => void;
  };
};

type Emits = {
  /** Emitted when the action button is clicked. */
  action: [];
};

const props = defineProps<ToastItem>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="sigma-ui-toaster-progress">
    <div class="sigma-ui-toaster-progress__content">
      <div class="sigma-ui-toaster-progress__header">
        {{ props.data.title }}
        <div
          v-if="props.data.progress && props.data.progress < 100"
          class="sigma-ui-toaster-progress__percentage"
        >
          {{ props.data.progress }}%
        </div>
      </div>
      <div class="sigma-ui-toaster-progress__description">
        {{ props.data.description }}
      </div>
      <div class="sigma-ui-toaster-progress__bar">
        <div
          class="sigma-ui-toaster-progress__bar-fill"
          :style="{ width: `${props.data.progress}%` }"
        />
      </div>
    </div>
    <Button
      size="xs"
      @click="emit('action')"
    >
      {{ props.data.actionText }}
    </Button>
  </div>
</template>

<style>
.sigma-ui-toaster-progress {
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--background);
  box-shadow: var(--shadow-md);
  gap: 1.5rem;
}

.sigma-ui-toaster-progress__content {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.sigma-ui-toaster-progress__header {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.5rem;
}

.sigma-ui-toaster-progress__percentage {
  color: var(--muted-foreground);
  font-size: 0.75rem;
}

.sigma-ui-toaster-progress__description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
}

.sigma-ui-toaster-progress__bar {
  width: 100%;
  height: 2px;
  border-radius: var(--rounded-full);
  margin-top: 0.5rem;
  background-color: color-mix(in oklch, var(--primary) 10%, transparent);
  font-size: 0.875rem;
}

.sigma-ui-toaster-progress__bar-fill {
  height: 2px;
  border-radius: var(--rounded-full);
  background-color: var(--primary);
}
</style>
