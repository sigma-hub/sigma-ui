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
} from '@lucide/vue';
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
  <div class="dashboard-mail__display">
    <div class="dashboard-mail__actions">
      <div class="dashboard-mail__action-group">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ArchiveIcon class="dashboard-mail__icon" />
              <span class="dashboard-mail__sr-only">{{ archiveLabel }}</span>
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
              <ArchiveXIcon class="dashboard-mail__icon" />
              <span class="dashboard-mail__sr-only">{{ junkLabel }}</span>
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
              <Trash2Icon class="dashboard-mail__icon" />
              <span class="dashboard-mail__sr-only">{{ trashLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ trashLabel }}</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          class="dashboard-mail__separator"
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
                  <ClockIcon class="dashboard-mail__icon" />
                  <span class="dashboard-mail__sr-only">{{ snoozeLabel }}</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="dashboard-mail__snooze">
              <div class="dashboard-mail__snooze-layout">
                <div class="dashboard-mail__snooze-options">
                  <div class="dashboard-mail__snooze-title">
                    {{ snoozeTitle }}
                  </div>
                  <Button
                    v-for="option in snoozeOptions"
                    :key="option.title"
                    variant="ghost"
                    class="dashboard-mail__snooze-option"
                  >
                    {{ option.title }}
                    <span class="dashboard-mail__snooze-detail">{{ option.detail }}</span>
                  </Button>
                </div>
                <div class="dashboard-mail__calendar">
                  <Calendar />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>{{ snoozeLabel }}</TooltipContent>
        </Tooltip>
      </div>
      <div class="dashboard-mail__action-group dashboard-mail__action-group--end">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ReplyIcon class="dashboard-mail__icon" />
              <span class="dashboard-mail__sr-only">{{ replyLabel }}</span>
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
              <ReplyAllIcon class="dashboard-mail__icon" />
              <span class="dashboard-mail__sr-only">{{ replyAllLabel }}</span>
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
              <ForwardIcon class="dashboard-mail__icon" />
              <span class="dashboard-mail__sr-only">{{ forwardLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ forwardLabel }}</TooltipContent>
        </Tooltip>
      </div>
      <Separator
        orientation="vertical"
        class="dashboard-mail__separator"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            :disabled="!mail"
          >
            <MoreVerticalIcon class="dashboard-mail__icon" />
            <span class="dashboard-mail__sr-only">{{ moreLabel }}</span>
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
      class="dashboard-mail__thread"
    >
      <div class="dashboard-mail__thread-header">
        <Avatar size="sm" />
        <div class="dashboard-mail__thread-meta">
          <div class="dashboard-mail__thread-name">
            {{ mail.name }}
          </div>
          <div class="dashboard-mail__thread-line">
            {{ mail.subject }}
          </div>
          <div class="dashboard-mail__thread-line">
            <span class="dashboard-mail__reply-to">{{ replyToLabel }}</span> {{ mail.email }}
          </div>
        </div>
        <div class="dashboard-mail__thread-date">
          {{ format(new Date(mail.date), 'PPpp') }}
        </div>
      </div>
      <Separator />
      <div class="dashboard-mail__body">
        {{ mail.text }}
      </div>
      <Separator class="dashboard-mail__reply-separator" />
      <form class="dashboard-mail__reply">
        <Textarea
          class="dashboard-mail__reply-input"
          :placeholder="`Reply ${mail.name}...`"
        />
        <div class="dashboard-mail__reply-footer">
          <Label class="dashboard-mail__mute">
            <Switch aria-label="Mute thread" />
            {{ muteLabel }}
          </Label>
          <Button
            type="button"
            size="sm"
            class="dashboard-mail__send"
          >
            {{ sendLabel }}
          </Button>
        </div>
      </form>
    </div>
    <div
      v-else
      class="dashboard-mail__empty"
    >
      {{ emptySelectionLabel }}
    </div>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-mail__display,
  .dashboard-mail__thread {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .dashboard-mail__actions,
  .dashboard-mail__action-group,
  .dashboard-mail__thread-header,
  .dashboard-mail__reply-footer,
  .dashboard-mail__snooze-layout {
    display: flex;
    align-items: center;
  }

  .dashboard-mail__actions {
    padding: calc(var(--spacing) * 2);
  }

  .dashboard-mail__action-group {
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-mail__action-group--end {
    margin-left: auto;
  }

  .dashboard-mail__separator.dashboard-mail__separator {
    height: calc(var(--spacing) * 6);
    margin: 0 calc(var(--spacing) * 2);
  }

  .dashboard-mail__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .dashboard-mail__sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .dashboard-mail__snooze.dashboard-mail__snooze {
    width: auto;
    padding: 0;
  }

  .dashboard-mail__snooze-options {
    display: flex;
    min-width: calc(var(--spacing) * 60);
    flex-direction: column;
    padding: calc(var(--spacing) * 4) calc(var(--spacing) * 2);
    border-right: 1px solid var(--border);
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-mail__snooze-title {
    padding: 0 calc(var(--spacing) * 4);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .dashboard-mail__snooze-option.dashboard-mail__snooze-option {
    justify-content: flex-start;
    font-weight: 400;
  }

  .dashboard-mail__snooze-detail {
    margin-left: auto;
    color: var(--muted-foreground);
  }

  .dashboard-mail__calendar {
    padding: calc(var(--spacing) * 2);
  }

  .dashboard-mail__thread-header {
    align-items: flex-start;
    padding: calc(var(--spacing) * 4);
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-mail__thread-meta {
    display: grid;
    min-width: 0;
    flex: 1;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-mail__thread-name {
    font-weight: 600;
  }

  .dashboard-mail__thread-line,
  .dashboard-mail__thread-date {
    overflow: hidden;
    font-size: 0.75rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dashboard-mail__reply-to {
    font-weight: 500;
  }

  .dashboard-mail__thread-date {
    margin-left: auto;
    color: var(--muted-foreground);
  }

  .dashboard-mail__body {
    flex: 1;
    padding: calc(var(--spacing) * 4);
    font-size: 0.875rem;
    white-space: pre-wrap;
  }

  .dashboard-mail__reply-separator {
    margin-top: auto;
  }

  .dashboard-mail__reply {
    display: grid;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-mail__reply-input {
    padding: calc(var(--spacing) * 4);
  }

  .dashboard-mail__mute {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 400;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-mail__send {
    margin-left: auto;
  }

  .dashboard-mail__empty {
    padding: calc(var(--spacing) * 8);
    color: var(--muted-foreground);
    text-align: center;
  }
}
</style>
