<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';

type Props = {
  title: string;
  description: string;
  actionText: string;
};

type Emits = {
  action: [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="sigma-ui-toaster-default">
    <div class="sigma-ui-toaster-default__content">
      <div class="sigma-ui-toaster-default__title">
        {{ props.title }}
      </div>
      <div class="sigma-ui-toaster-default__description">
        {{ props.description }}
      </div>
    </div>
    <Button
      size="xs"
      @click="emit('action')"
    >
      {{ props.actionText }}
    </Button>
  </div>
</template>

<style>
.sigma-ui-toaster-default {
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  background-color: hsl(var(--background));
  box-shadow: var(--shadow-md);
}

.sigma-ui-toaster-default__title {
  font-size: 0.875rem;
  font-weight: 600;
}

.sigma-ui-toaster-default__description {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
</style>
