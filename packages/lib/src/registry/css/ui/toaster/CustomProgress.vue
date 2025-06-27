<script lang="ts" setup>
import { Button } from '@ui/registry/css/ui/button';

export type ToastItem = {
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
  gap: 1.5rem;
  align-items: flex-end;
  justify-content: space-between;
  background-color: hsl(var(--background));
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  padding: 1rem;
  box-shadow: var(--shadow-md);
}

.sigma-ui-toaster-progress__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sigma-ui-toaster-progress__header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.sigma-ui-toaster-progress__percentage {
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
}

.sigma-ui-toaster-progress__description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.sigma-ui-toaster-progress__bar {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  background-color: hsl(var(--primary) / 0.1);
  border-radius: var(--rounded-full);
  height: 2px;
  width: 100%;
}

.sigma-ui-toaster-progress__bar-fill {
  background-color: hsl(var(--primary));
  height: 2px;
  border-radius: var(--rounded-full);
}
</style>
