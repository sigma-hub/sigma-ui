<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';

type Props = {
  /** Heading of the toast. */
  title: string;
  /** Secondary text below the title. */
  description: string;
  /** Label of the action button. */
  actionText: string;
};

type Emits = {
  /** Emitted when the action button is clicked. */
  action: [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div
    class="sigma-ui-toaster-default"
    data-slot="custom-simple"
  >
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
@layer base, components;

@layer components {
  .sigma-ui-toaster-default {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    padding: calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background-color: var(--background);
    box-shadow: var(--shadow-md);
  }

  .sigma-ui-toaster-default__title {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .sigma-ui-toaster-default__description {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }
}
</style>
