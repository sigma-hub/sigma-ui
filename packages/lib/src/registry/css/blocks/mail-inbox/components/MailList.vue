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
  <ScrollArea class="mail-inbox__scroll">
    <div class="mail-inbox__messages">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="mail-inbox__message"
        :class="{ 'mail-inbox__message--selected': selectedMail === item.id }"
        @click="selectedMail = item.id"
      >
        <div class="mail-inbox__message-header">
          <div class="mail-inbox__sender">
            <div class="mail-inbox__name">
              {{ item.name }}
            </div>
            <span
              v-if="!item.read"
              class="mail-inbox__unread"
            />
            <div
              class="mail-inbox__date"
              :class="{ 'mail-inbox__date--selected': selectedMail === item.id }"
            >
              {{ formatDistanceToNow(new Date(item.date), { addSuffix: true }) }}
            </div>
          </div>
          <div class="mail-inbox__subject">
            {{ item.subject }}
          </div>
        </div>
        <div class="mail-inbox__preview">
          {{ item.text }}
        </div>
        <div class="mail-inbox__labels">
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
.mail-inbox__scroll {
  height: 100%;
}

.mail-inbox__messages {
  display: flex;
  flex-direction: column;
  padding: 0 calc(var(--spacing) * 4) calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 2);
}

.mail-inbox__message {
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

.mail-inbox__message:hover,
.mail-inbox__message--selected {
  background-color: var(--muted);
}

.mail-inbox__message-header,
.mail-inbox__sender {
  display: flex;
  width: 100%;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.mail-inbox__message-header {
  flex-direction: column;
  align-items: stretch;
  gap: calc(var(--spacing) * 1);
}

.mail-inbox__name,
.mail-inbox__subject {
  font-weight: 600;
}

.mail-inbox__subject,
.mail-inbox__preview,
.mail-inbox__date {
  font-size: 0.75rem;
}

.mail-inbox__unread {
  width: calc(var(--spacing) * 2);
  height: calc(var(--spacing) * 2);
  border-radius: 9999px;
  background-color: var(--primary);
}

.mail-inbox__date {
  margin-left: auto;
  color: var(--muted-foreground);
}

.mail-inbox__date--selected {
  color: var(--foreground);
}

.mail-inbox__preview {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  color: var(--muted-foreground);
  -webkit-line-clamp: 2;
}

.mail-inbox__labels {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}
</style>
