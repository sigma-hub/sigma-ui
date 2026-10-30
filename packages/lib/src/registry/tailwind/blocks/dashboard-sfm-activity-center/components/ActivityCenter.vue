<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { ActivityIcon, ChevronDownIcon, ChevronRightIcon, InboxIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ui/registry/tailwind/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Spinner } from '@ui/registry/tailwind/ui/spinner';
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
const headingRef = ref<HTMLElement | null>(null);
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

/**
 * Reka focuses the first button when the panel opens, which is the destructive "Cancel all".
 * Focus the panel heading instead, so Tab still reaches every control in order.
 */
function focusHeading(event: Event) {
  event.preventDefault();
  nextTick(() => headingRef.value?.focus({ preventScroll: true }));
}

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
      class="w-[min(24rem,calc(100vw-2rem))] p-0"
      @open-auto-focus="focusHeading"
    >
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <div class="min-w-0">
          <h3
            ref="headingRef"
            tabindex="-1"
            class="text-sm leading-5 font-semibold outline-hidden"
          >
            {{ activityLabel }}
          </h3>
          <p class="truncate text-xs text-muted-foreground">
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
        class="flex flex-col items-center gap-2 px-4 py-10 text-center"
      >
        <InboxIcon
          class="size-6 text-muted-foreground"
          aria-hidden="true"
        />
        <p class="text-sm font-medium">
          {{ emptyLabel }}
        </p>
        <p class="text-xs text-muted-foreground">
          {{ emptyHint }}
        </p>
      </div>

      <div
        v-else
        class="max-h-[min(26rem,60vh)] overflow-y-auto"
      >
        <ul
          v-if="running.length > 0"
          class="m-0 list-none divide-y p-0"
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
          :class="{ 'border-t': running.length > 0 }"
        >
          <div class="flex items-center justify-between gap-2 px-2 py-1.5">
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
              class="m-0 list-none divide-y border-t p-0"
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
