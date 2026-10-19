<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@ui/registry/css/ui/badge';
import { ScrollArea } from '@ui/registry/css/ui/scroll-area';
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
  <ScrollArea class="dashboard-mail__scroll">
    <div class="dashboard-mail__messages">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="dashboard-mail__message"
        :class="{ 'dashboard-mail__message--selected': selectedMail === item.id }"
        @click="selectedMail = item.id"
      >
        <div class="dashboard-mail__message-header">
          <div class="dashboard-mail__sender">
            <div class="dashboard-mail__name">
              {{ item.name }}
            </div>
            <span
              v-if="!item.read"
              class="dashboard-mail__unread"
            />
            <div
              class="dashboard-mail__date"
              :class="{ 'dashboard-mail__date--selected': selectedMail === item.id }"
            >
              {{ formatDistanceToNow(new Date(item.date), { addSuffix: true }) }}
            </div>
          </div>
          <div class="dashboard-mail__subject">
            {{ item.subject }}
          </div>
        </div>
        <div class="dashboard-mail__preview">
          {{ item.text }}
        </div>
        <div class="dashboard-mail__labels">
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

<style>
@layer base, components;

@layer components {
  .dashboard-mail__scroll {
    height: 100%;
  }

  .dashboard-mail__messages {
    display: flex;
    flex-direction: column;
    padding: 0 calc(var(--spacing) * 4) calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-mail__message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: calc(var(--spacing) * 3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 2);
    text-align: left;
  }

  .dashboard-mail__message:hover,
  .dashboard-mail__message--selected {
    background-color: var(--muted);
  }

  .dashboard-mail__message-header,
  .dashboard-mail__sender {
    display: flex;
    width: 100%;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-mail__message-header {
    flex-direction: column;
    align-items: stretch;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-mail__name,
  .dashboard-mail__subject {
    font-weight: 600;
  }

  .dashboard-mail__subject,
  .dashboard-mail__preview,
  .dashboard-mail__date {
    font-size: 0.75rem;
  }

  .dashboard-mail__unread {
    width: calc(var(--spacing) * 2);
    height: calc(var(--spacing) * 2);
    border-radius: 9999px;
    background-color: var(--primary);
  }

  .dashboard-mail__date {
    margin-left: auto;
    color: var(--muted-foreground);
  }

  .dashboard-mail__date--selected {
    color: var(--foreground);
  }

  .dashboard-mail__preview {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    color: var(--muted-foreground);
    -webkit-line-clamp: 2;
  }

  .dashboard-mail__labels {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }
}
</style>
