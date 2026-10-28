<script setup lang="ts">
import { computed } from 'vue';
import { BanIcon, CircleAlertIcon, CircleCheckIcon, RotateCwIcon, XIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import { Progress } from '@ui/registry/css/ui/progress';
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
  <li class="dashboard-activity-center__row">
    <div
      class="dashboard-activity-center__icon"
      :class="isSuccess
        ? 'dashboard-activity-center__icon--success'
        : isError
          ? 'dashboard-activity-center__icon--error'
          : 'dashboard-activity-center__icon--idle'"
    >
      <component
        :is="statusIcon"
        aria-hidden="true"
      />
    </div>
    <div class="dashboard-activity-center__body">
      <div class="dashboard-activity-center__text">
        <p class="dashboard-activity-center__title">
          {{ item.title }}
        </p>
        <p
          class="dashboard-activity-center__detail"
          :class="isError ? 'dashboard-activity-center__detail--error' : 'dashboard-activity-center__detail--idle'"
        >
          {{ detail }}
        </p>
      </div>
      <div
        v-if="isRunning"
        class="dashboard-activity-center__progress"
      >
        <Progress
          :model-value="item.progress ?? 100"
          :aria-label="`${item.title} progress`"
          :class="{ 'dashboard-activity-center__bar--pending': item.progress === null }"
        />
        <span class="dashboard-activity-center__percent">
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

<style>
@layer base, components;

@layer components {
  .dashboard-activity-center__row {
    display: flex;
    align-items: flex-start;
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-activity-center__icon {
    display: flex;
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: calc(var(--radius) - 2px);
  }

  .dashboard-activity-center__icon--idle {
    background-color: var(--muted);
    color: var(--muted-foreground);
  }

  .dashboard-activity-center__icon svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .dashboard-activity-center__icon--success {
    background-color: color-mix(in oklch, var(--success, oklch(62.3% 0.169 149.178deg)) 12%, transparent);
    color: var(--success, oklch(62.3% 0.169 149.178deg));
  }

  .dashboard-activity-center__icon--error {
    background-color: color-mix(in oklch, var(--destructive) 10%, transparent);
    color: var(--destructive);
  }

  .dashboard-activity-center__body {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-activity-center__text {
    min-width: 0;
  }

  .dashboard-activity-center__title,
  .dashboard-activity-center__detail {
    overflow: hidden;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dashboard-activity-center__title {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
  }

  .dashboard-activity-center__detail {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .dashboard-activity-center__detail--idle {
    color: var(--muted-foreground);
  }

  .dashboard-activity-center__detail--error {
    color: var(--destructive);
  }

  .dashboard-activity-center__progress {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-activity-center__bar--pending {
    animation: dashboard-activity-center-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes dashboard-activity-center-pulse {
    50% {
      opacity: 0.5;
    }
  }

  .dashboard-activity-center__percent {
    width: calc(var(--spacing) * 9);
    flex-shrink: 0;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    line-height: 1rem;
    text-align: right;
  }
}
</style>
