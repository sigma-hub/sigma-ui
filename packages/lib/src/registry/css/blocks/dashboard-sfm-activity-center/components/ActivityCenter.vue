<script setup lang="ts">
import { computed, ref } from 'vue';
import { ActivityIcon, ChevronDownIcon, ChevronRightIcon, InboxIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/registry/css/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';
import { Separator } from '@ui/registry/css/ui/separator';
import { Spinner } from '@ui/registry/css/ui/spinner';
import ActivityRow from './ActivityRow.vue';
import { activityLabel, emptyHint, emptyLabel } from '../data';
import type { ActivityItem } from '../data';

const props = withDefaults(defineProps<{
  items: ActivityItem[];
  defaultOpen?: boolean;
}>(), {
  defaultOpen: false,
});

const emit = defineEmits<{
  cancel: [id: string];
  cancelAll: [];
  dismiss: [id: string];
  clearCompleted: [];
  retry: [id: string];
}>();

const open = ref(props.defaultOpen);
const completedOpen = ref(true);

const running = computed(() => props.items.filter(item => item.status === 'running'));
const completed = computed(() => props.items.filter(item => item.status !== 'running'));
const failedCount = computed(() => completed.value.filter(item => item.status === 'error').length);

const summary = computed(() => {
  if (props.items.length === 0) {
    return emptyLabel;
  }

  const parts: string[] = [];

  if (running.value.length > 0) {
    parts.push(`${running.value.length} running`);
  }

  if (completed.value.length > 0) {
    parts.push(`${completed.value.length} finished`);
  }

  if (failedCount.value > 0) {
    parts.push(`${failedCount.value} failed`);
  }

  return parts.join(' · ');
});

const triggerLabel = computed(() => `${activityLabel}: ${summary.value}`);
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        :aria-label="triggerLabel"
      >
        <Spinner
          v-if="running.length > 0"
          label="Jobs running"
        />
        <ActivityIcon
          v-else
          aria-hidden="true"
        />
        {{ activityLabel }}
        <Badge
          v-if="running.length > 0"
          variant="secondary"
        >
          {{ running.length }}
        </Badge>
        <Badge
          v-else-if="failedCount > 0"
          variant="destructive"
        >
          {{ failedCount }}
        </Badge>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      align="end"
      class="dashboard-sfm-activity-center__popover"
    >
      <div class="dashboard-sfm-activity-center__panel-header">
        <div class="dashboard-sfm-activity-center__heading">
          <h3 class="dashboard-sfm-activity-center__heading-title">
            {{ activityLabel }}
          </h3>
          <p class="dashboard-sfm-activity-center__summary">
            {{ summary }}
          </p>
        </div>
        <Button
          v-if="running.length > 1"
          variant="outline"
          size="xs"
          @click="emit('cancelAll')"
        >
          Cancel all
        </Button>
      </div>
      <Separator />

      <div
        v-if="items.length === 0"
        class="dashboard-sfm-activity-center__empty"
      >
        <InboxIcon
          class="dashboard-sfm-activity-center__empty-icon"
          aria-hidden="true"
        />
        <p class="dashboard-sfm-activity-center__empty-title">
          {{ emptyLabel }}
        </p>
        <p class="dashboard-sfm-activity-center__empty-hint">
          {{ emptyHint }}
        </p>
      </div>

      <div
        v-else
        class="dashboard-sfm-activity-center__scroll"
      >
        <ul
          v-if="running.length > 0"
          class="dashboard-sfm-activity-center__list"
          aria-label="Running jobs"
        >
          <ActivityRow
            v-for="item in running"
            :key="item.id"
            :item="item"
            @cancel="emit('cancel', $event)"
          />
        </ul>

        <Collapsible
          v-if="completed.length > 0"
          v-model:open="completedOpen"
          :class="{ 'dashboard-sfm-activity-center__completed--divided': running.length > 0 }"
        >
          <div class="dashboard-sfm-activity-center__completed-header">
            <CollapsibleTrigger as-child>
              <Button
                variant="ghost"
                size="sm"
              >
                <ChevronDownIcon v-if="completedOpen" />
                <ChevronRightIcon v-else />
                Finished
                <Badge variant="secondary">
                  {{ completed.length }}
                </Badge>
              </Button>
            </CollapsibleTrigger>
            <Button
              variant="ghost"
              size="sm"
              @click="emit('clearCompleted')"
            >
              Clear
            </Button>
          </div>
          <CollapsibleContent>
            <ul
              class="dashboard-sfm-activity-center__list dashboard-sfm-activity-center__list--bordered"
              aria-label="Finished jobs"
            >
              <ActivityRow
                v-for="item in completed"
                :key="item.id"
                :item="item"
                @dismiss="emit('dismiss', $event)"
                @retry="emit('retry', $event)"
              />
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-sfm-activity-center__popover.dashboard-sfm-activity-center__popover {
    width: min(24rem, calc(100vw - 2rem));
    padding: 0;
  }

  .dashboard-sfm-activity-center__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-sfm-activity-center__heading {
    min-width: 0;
  }

  .dashboard-sfm-activity-center__heading-title {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }

  .dashboard-sfm-activity-center__summary {
    overflow: hidden;
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    line-height: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dashboard-sfm-activity-center__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(var(--spacing) * 10) calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 2);
    text-align: center;
  }

  .dashboard-sfm-activity-center__empty-icon {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
    color: var(--muted-foreground);
  }

  .dashboard-sfm-activity-center__empty-title {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .dashboard-sfm-activity-center__empty-hint {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.75rem;
  }

  .dashboard-sfm-activity-center__scroll {
    max-height: min(26rem, 60vh);
    overflow-y: auto;
  }

  .dashboard-sfm-activity-center__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .dashboard-sfm-activity-center__list > li + li {
    border-top: 1px solid var(--border);
  }

  .dashboard-sfm-activity-center__list--bordered {
    border-top: 1px solid var(--border);
  }

  .dashboard-sfm-activity-center__completed--divided {
    border-top: 1px solid var(--border);
  }

  .dashboard-sfm-activity-center__completed-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    gap: calc(var(--spacing) * 2);
  }
}
</style>
