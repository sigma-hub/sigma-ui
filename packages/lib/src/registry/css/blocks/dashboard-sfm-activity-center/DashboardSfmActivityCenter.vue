<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
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
  <div class="dashboard-sfm-activity-center">
    <header class="dashboard-sfm-activity-center__header">
      <div class="dashboard-sfm-activity-center__intro">
        <h2 class="dashboard-sfm-activity-center__page-title">
          {{ pageTitle }}
        </h2>
        <p class="dashboard-sfm-activity-center__page-description">
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
        <div class="dashboard-sfm-activity-center__actions">
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

<style>
@layer base, components;

@layer components {
  .dashboard-sfm-activity-center {
    display: flex;
    width: 100%;
    max-width: 64rem;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    margin-inline: auto;
    gap: calc(var(--spacing) * 6);
  }

  .dashboard-sfm-activity-center__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-sfm-activity-center__intro {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-sfm-activity-center__page-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .dashboard-sfm-activity-center__page-description {
    margin: 0;
    color: var(--muted-foreground);
  }

  .dashboard-sfm-activity-center__actions {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--spacing) * 2);
  }

  @media (width >= 40rem) {
    .dashboard-sfm-activity-center {
      padding: calc(var(--spacing) * 6);
    }
  }
}
</style>
