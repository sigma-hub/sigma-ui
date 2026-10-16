<script setup lang="ts">
import {
  ArchiveIcon,
  ArchiveXIcon,
  ClockIcon,
  ForwardIcon,
  MoreVerticalIcon,
  ReplyAllIcon,
  ReplyIcon,
  Trash2Icon,
} from 'lucide-vue-next';
import { addDays, addHours, format, nextSaturday } from 'date-fns';
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Button } from '@ui/registry/css/ui/button';
import { Calendar } from '@ui/registry/css/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@ui/registry/css/ui/dropdown-menu';
import { Label } from '@ui/registry/css/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';
import { Separator } from '@ui/registry/css/ui/separator';
import { Switch } from '@ui/registry/css/ui/switch';
import { Textarea } from '@ui/registry/css/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/registry/css/ui/tooltip';
import type { Mail } from '../data';

defineProps<{
  mail: Mail | undefined;
  emptySelectionLabel: string;
  sendLabel: string;
  muteLabel: string;
  replyToLabel: string;
  snoozeTitle: string;
  archiveLabel: string;
  junkLabel: string;
  trashLabel: string;
  snoozeLabel: string;
  replyLabel: string;
  replyAllLabel: string;
  forwardLabel: string;
  moreLabel: string;
}>();

const today = new Date();
const snoozeOptions = [
  { title: 'Later today', detail: format(addHours(today, 4), 'E, h:m b') },
  { title: 'Tomorrow', detail: format(addDays(today, 1), 'E, h:m b') },
  { title: 'This weekend', detail: format(nextSaturday(today), 'E, h:m b') },
  { title: 'Next week', detail: format(addDays(today, 7), 'E, h:m b') },
];
const menuActions = ['Mark as unread', 'Star thread', 'Add label', 'Mute thread'];
</script>

<template>
  <div class="mail-inbox__display">
    <div class="mail-inbox__actions">
      <div class="mail-inbox__action-group">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ArchiveIcon class="mail-inbox__icon" />
              <span class="mail-inbox__sr-only">{{ archiveLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ archiveLabel }}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ArchiveXIcon class="mail-inbox__icon" />
              <span class="mail-inbox__sr-only">{{ junkLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ junkLabel }}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <Trash2Icon class="mail-inbox__icon" />
              <span class="mail-inbox__sr-only">{{ trashLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ trashLabel }}</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          class="mail-inbox__separator"
        />
        <Tooltip>
          <Popover>
            <PopoverTrigger as-child>
              <TooltipTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon"
                  :disabled="!mail"
                >
                  <ClockIcon class="mail-inbox__icon" />
                  <span class="mail-inbox__sr-only">{{ snoozeLabel }}</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="mail-inbox__snooze">
              <div class="mail-inbox__snooze-layout">
                <div class="mail-inbox__snooze-options">
                  <div class="mail-inbox__snooze-title">
                    {{ snoozeTitle }}
                  </div>
                  <Button
                    v-for="option in snoozeOptions"
                    :key="option.title"
                    variant="ghost"
                    class="mail-inbox__snooze-option"
                  >
                    {{ option.title }}
                    <span class="mail-inbox__snooze-detail">{{ option.detail }}</span>
                  </Button>
                </div>
                <div class="mail-inbox__calendar">
                  <Calendar />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>{{ snoozeLabel }}</TooltipContent>
        </Tooltip>
      </div>
      <div class="mail-inbox__action-group mail-inbox__action-group--end">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ReplyIcon class="mail-inbox__icon" />
              <span class="mail-inbox__sr-only">{{ replyLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ replyLabel }}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ReplyAllIcon class="mail-inbox__icon" />
              <span class="mail-inbox__sr-only">{{ replyAllLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ replyAllLabel }}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ForwardIcon class="mail-inbox__icon" />
              <span class="mail-inbox__sr-only">{{ forwardLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ forwardLabel }}</TooltipContent>
        </Tooltip>
      </div>
      <Separator
        orientation="vertical"
        class="mail-inbox__separator"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            :disabled="!mail"
          >
            <MoreVerticalIcon class="mail-inbox__icon" />
            <span class="mail-inbox__sr-only">{{ moreLabel }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            v-for="action in menuActions"
            :key="action"
          >
            {{ action }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Separator />
    <div
      v-if="mail"
      class="mail-inbox__thread"
    >
      <div class="mail-inbox__thread-header">
        <Avatar size="sm" />
        <div class="mail-inbox__thread-meta">
          <div class="mail-inbox__thread-name">
            {{ mail.name }}
          </div>
          <div class="mail-inbox__thread-line">
            {{ mail.subject }}
          </div>
          <div class="mail-inbox__thread-line">
            <span class="mail-inbox__reply-to">{{ replyToLabel }}</span> {{ mail.email }}
          </div>
        </div>
        <div class="mail-inbox__thread-date">
          {{ format(new Date(mail.date), 'PPpp') }}
        </div>
      </div>
      <Separator />
      <div class="mail-inbox__body">
        {{ mail.text }}
      </div>
      <Separator class="mail-inbox__reply-separator" />
      <form class="mail-inbox__reply">
        <Textarea
          class="mail-inbox__reply-input"
          :placeholder="`Reply ${mail.name}...`"
        />
        <div class="mail-inbox__reply-footer">
          <Label class="mail-inbox__mute">
            <Switch aria-label="Mute thread" />
            {{ muteLabel }}
          </Label>
          <Button
            type="button"
            size="sm"
            class="mail-inbox__send"
          >
            {{ sendLabel }}
          </Button>
        </div>
      </form>
    </div>
    <div
      v-else
      class="mail-inbox__empty"
    >
      {{ emptySelectionLabel }}
    </div>
  </div>
</template>

<style>
.mail-inbox__display,
.mail-inbox__thread {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.mail-inbox__actions,
.mail-inbox__action-group,
.mail-inbox__thread-header,
.mail-inbox__reply-footer,
.mail-inbox__snooze-layout {
  display: flex;
  align-items: center;
}

.mail-inbox__actions {
  padding: 0.5rem;
}

.mail-inbox__action-group {
  gap: 0.5rem;
}

.mail-inbox__action-group--end {
  margin-left: auto;
}

.mail-inbox__separator.mail-inbox__separator {
  height: 1.5rem;
  margin: 0 0.5rem;
}

.mail-inbox__icon {
  width: 1rem;
  height: 1rem;
}

.mail-inbox__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.mail-inbox__snooze.mail-inbox__snooze {
  width: auto;
  padding: 0;
}

.mail-inbox__snooze-options {
  display: flex;
  min-width: 15rem;
  flex-direction: column;
  gap: 0.25rem;
  border-right: 1px solid var(--border);
  padding: 1rem 0.5rem;
}

.mail-inbox__snooze-title {
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.mail-inbox__snooze-option.mail-inbox__snooze-option {
  justify-content: flex-start;
  font-weight: 400;
}

.mail-inbox__snooze-detail {
  margin-left: auto;
  color: var(--muted-foreground);
}

.mail-inbox__calendar {
  padding: 0.5rem;
}

.mail-inbox__thread-header {
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  font-size: 0.875rem;
}

.mail-inbox__thread-meta {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 0.25rem;
}

.mail-inbox__thread-name {
  font-weight: 600;
}

.mail-inbox__thread-line,
.mail-inbox__thread-date {
  overflow: hidden;
  font-size: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mail-inbox__reply-to {
  font-weight: 500;
}

.mail-inbox__thread-date {
  margin-left: auto;
  color: var(--muted-foreground);
}

.mail-inbox__body {
  flex: 1;
  padding: 1rem;
  font-size: 0.875rem;
  white-space: pre-wrap;
}

.mail-inbox__reply-separator {
  margin-top: auto;
}

.mail-inbox__reply {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

.mail-inbox__reply-input {
  padding: 1rem;
}

.mail-inbox__mute {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
}

.mail-inbox__send {
  margin-left: auto;
}

.mail-inbox__empty {
  padding: 2rem;
  color: var(--muted-foreground);
  text-align: center;
}
</style>
