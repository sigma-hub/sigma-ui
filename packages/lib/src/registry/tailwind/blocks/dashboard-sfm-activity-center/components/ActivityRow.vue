<script setup lang="ts">
import { computed } from 'vue';
import { BanIcon, CircleAlertIcon, CircleCheckIcon, RotateCwIcon, XIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Progress } from '@ui/registry/tailwind/ui/progress';
import { kindIcons } from '../data';
import type { ActivityItem } from '../data';

const props = defineProps<{
  item: ActivityItem;
}>();

const emit = defineEmits<{
  cancel: [id: string];
  dismiss: [id: string];
  retry: [id: string];
}>();

const isRunning = computed(() => props.item.status === 'running');
const isSuccess = computed(() => props.item.status === 'success');
const isError = computed(() => props.item.status === 'error');

const statusIcon = computed(() => {
  if (props.item.status === 'success') {
    return CircleCheckIcon;
  }

  if (props.item.status === 'error') {
    return CircleAlertIcon;
  }

  if (props.item.status === 'cancelled') {
    return BanIcon;
  }

  return kindIcons[props.item.kind];
});

const detail = computed(() => {
  if (isRunning.value) {
    return props.item.subtitle;
  }

  return props.item.message ?? (props.item.status === 'cancelled' ? 'Cancelled' : props.item.subtitle);
});

const percentLabel = computed(() => {
  return props.item.progress === null ? '' : `${Math.round(props.item.progress)}%`;
});
</script>

<template>
  <li class="flex items-start gap-3 px-4 py-3">
    <div
      class="flex size-8 shrink-0 items-center justify-center rounded-md [&_svg]:size-4"
      :class="isSuccess
        ? 'bg-green-500/10 text-green-600 dark:text-green-500'
        : isError
          ? 'bg-destructive/10 text-destructive'
          : 'bg-muted text-muted-foreground'"
    >
      <component
        :is="statusIcon"
        aria-hidden="true"
      />
    </div>
    <div class="flex min-w-0 flex-1 flex-col gap-2">
      <div class="min-w-0">
        <p class="truncate text-sm leading-5 font-medium">
          {{ item.title }}
        </p>
        <p
          class="truncate text-xs"
          :class="isError ? 'text-destructive' : 'text-muted-foreground'"
        >
          {{ detail }}
        </p>
      </div>
      <div
        v-if="isRunning"
        class="flex items-center gap-3"
      >
        <Progress
          :model-value="item.progress ?? 100"
          :aria-label="`${item.title} progress`"
          :class="{ 'animate-pulse': item.progress === null }"
        />
        <span class="w-9 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
          {{ percentLabel }}
        </span>
      </div>
    </div>
    <Button
      v-if="isError"
      variant="ghost"
      size="icon-xs"
      :aria-label="`Retry ${item.title}`"
      @click="emit('retry', item.id)"
    >
      <RotateCwIcon />
    </Button>
    <Button
      variant="ghost"
      size="icon-xs"
      :aria-label="isRunning ? `Cancel ${item.title}` : `Dismiss ${item.title}`"
      @click="isRunning ? emit('cancel', item.id) : emit('dismiss', item.id)"
    >
      <XIcon />
    </Button>
  </li>
</template>
