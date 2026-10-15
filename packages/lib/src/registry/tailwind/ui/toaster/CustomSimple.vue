<script lang="ts" setup>
import { Button } from '@ui/registry/tailwind/ui/button';

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
  <div class="flex w-full items-end justify-between bg-background rounded border border-border p-4 shadow-lg">
    <div>
      <div class="text-sm font-semibold">
        {{ props.title }}
      </div>
      <div class="text-sm text-muted-foreground">
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
