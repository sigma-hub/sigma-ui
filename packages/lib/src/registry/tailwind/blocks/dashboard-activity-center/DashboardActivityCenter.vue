<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import ActivityCenter from './components/ActivityCenter.vue';
import { demoDescription, demoTitle, initialItems, kindIcons, pageDescription, pageTitle, sampleJobs } from './data';
import type { ActivityItem, ActivityKind } from './data';

withDefaults(defineProps<{
  defaultOpen?: boolean;
}>(), {
  defaultOpen: true,
});

const items = ref<ActivityItem[]>(initialItems.map(item => ({ ...item })));
const timers = new Map<string, ReturnType<typeof setInterval>>();
let jobCounter = 0;

function updateItem(id: string, patch: Partial<ActivityItem>) {
  const item = items.value.find(entry => entry.id === id);

  if (item) {
    Object.assign(item, patch);
  }
}

function stopTimer(id: string) {
  const timer = timers.get(id);

  if (timer !== undefined) {
    clearInterval(timer);
  }

  timers.delete(id);
}

// Simulates a job. Replace this with real progress events from your API or worker.
function runJob(id: string, successMessage: string) {
  stopTimer(id);
  let ticks = 0;
  timers.set(id, setInterval(() => {
    const item = items.value.find(entry => entry.id === id);

    if (!item || item.status !== 'running') {
      stopTimer(id);
      return;
    }

    ticks += 1;

    if (item.progress === null) {
      if (ticks >= 4) {
        item.progress = 0;
      }

      return;
    }

    item.progress = Math.min(100, item.progress + 4 + (ticks % 3) * 2);

    if (item.progress >= 100) {
      Object.assign(item, { status: 'success', message: successMessage });
      stopTimer(id);
    }
  }, 1000));
}

function startJob(kind: ActivityKind) {
  const sample = sampleJobs[kind];
  jobCounter += 1;
  const id = `demo-job-${jobCounter}`;
  items.value.unshift({
    id,
    kind: sample.kind,
    title: sample.title,
    subtitle: sample.subtitle,
    status: 'running',
    progress: kind === 'sync' ? null : 0,
  });
  runJob(id, sample.successMessage);
}

function cancelJob(id: string) {
  updateItem(id, { status: 'cancelled', message: 'Cancelled' });
  stopTimer(id);
}

function cancelAll() {
  items.value.filter(item => item.status === 'running').forEach(item => cancelJob(item.id));
}

function dismissJob(id: string) {
  stopTimer(id);
  items.value = items.value.filter(item => item.id !== id);
}

function clearCompleted() {
  items.value = items.value.filter(item => item.status === 'running');
}

function retryJob(id: string) {
  const item = items.value.find(entry => entry.id === id);

  if (!item) {
    return;
  }

  updateItem(id, { status: 'running', progress: null, message: undefined });
  runJob(id, 'Completed');
}

onMounted(() => {
  items.value
    .filter(item => item.status === 'running')
    .forEach(item => runJob(item.id, 'Completed'));
});

onBeforeUnmount(() => {
  timers.forEach(timer => clearInterval(timer));
  timers.clear();
});
</script>

<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6">
    <header class="flex items-start justify-between gap-4">
      <div class="flex min-w-0 flex-col gap-1">
        <h2 class="text-2xl leading-8 font-bold tracking-tight">
          {{ pageTitle }}
        </h2>
        <p class="text-muted-foreground">
          {{ pageDescription }}
        </p>
      </div>
      <ActivityCenter
        :items="items"
        :default-open="defaultOpen"
        @cancel="cancelJob"
        @cancel-all="cancelAll"
        @dismiss="dismissJob"
        @clear-completed="clearCompleted"
        @retry="retryJob"
      />
    </header>

    <Card>
      <CardHeader>
        <CardTitle>{{ demoTitle }}</CardTitle>
        <CardDescription>{{ demoDescription }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="sample in sampleJobs"
            :key="sample.kind"
            variant="outline"
            @click="startJob(sample.kind)"
          >
            <component
              :is="kindIcons[sample.kind]"
              aria-hidden="true"
            />
            {{ sample.label }}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
