<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { ScrollArea } from '@ui/registry/tailwind/ui/scroll-area';
import type { Mail } from '../data';

defineProps<{
  items: Mail[];
}>();

const selectedMail = defineModel<string>('selectedMail');

function badgeVariant(label: string) {
  const normalized = label.toLowerCase();

  if (normalized === 'work') {
    return 'default';
  }

  if (normalized === 'personal') {
    return 'outline';
  }

  return 'secondary';
}
</script>

<template>
  <ScrollArea class="h-full">
    <div class="flex flex-col gap-2 p-4 pt-0">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-secondary"
        :class="{ 'bg-muted': selectedMail === item.id }"
        @click="selectedMail = item.id"
      >
        <div class="flex w-full flex-col gap-1">
          <div class="flex items-center gap-2">
            <div class="font-semibold">
              {{ item.name }}
            </div>
            <span
              v-if="!item.read"
              class="size-2 rounded-full bg-blue-600"
            />
            <div
              class="ml-auto text-xs"
              :class="selectedMail === item.id ? 'text-foreground' : 'text-muted-foreground'"
            >
              {{ formatDistanceToNow(new Date(item.date), { addSuffix: true }) }}
            </div>
          </div>
          <div class="text-xs font-medium">
            {{ item.subject }}
          </div>
        </div>
        <div class="line-clamp-2 text-xs text-muted-foreground">
          {{ item.text }}
        </div>
        <div class="flex items-center gap-2">
          <Badge
            v-for="label in item.labels"
            :key="label"
            :variant="badgeVariant(label)"
          >
            {{ label }}
          </Badge>
        </div>
      </button>
    </div>
  </ScrollArea>
</template>
