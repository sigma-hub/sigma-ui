<script lang="ts" setup>
import { Button } from '@ui/registry/tailwind/ui/button';

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
  <div class="flex w-full gap-6 items-end justify-between bg-background rounded border border-border p-4 shadow-lg">
    <div class="flex flex-col flex-1">
      <div class="flex gap-2 items-center text-sm font-semibold">
        {{ props.data.title }}
        <div
          v-if="props.data.progress && props.data.progress < 100"
          class="text-xs text-muted-foreground"
        >
          {{ props.data.progress }}%
        </div>
      </div>
      <div class="text-sm text-muted-foreground">
        {{ props.data.description }}
      </div>
      <div class="mt-2 text-sm bg-primary/10 rounded-full h-[2px] w-full">
        <div
          class="bg-primary h-[2px] rounded-full"
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
