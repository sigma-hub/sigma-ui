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
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Calendar } from '@ui/registry/tailwind/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@ui/registry/tailwind/ui/dropdown-menu';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/tailwind/ui/popover';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { Switch } from '@ui/registry/tailwind/ui/switch';
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/registry/tailwind/ui/tooltip';
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
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div class="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ArchiveIcon class="size-4" />
              <span class="sr-only">{{ archiveLabel }}</span>
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
              <ArchiveXIcon class="size-4" />
              <span class="sr-only">{{ junkLabel }}</span>
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
              <Trash2Icon class="size-4" />
              <span class="sr-only">{{ trashLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ trashLabel }}</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          class="mx-1 h-6"
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
                  <ClockIcon class="size-4" />
                  <span class="sr-only">{{ snoozeLabel }}</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <div class="flex">
                <div class="flex flex-col gap-2 border-r px-2 py-4">
                  <div class="px-4 text-sm font-medium">
                    {{ snoozeTitle }}
                  </div>
                  <div class="grid min-w-60 gap-1">
                    <Button
                      v-for="option in snoozeOptions"
                      :key="option.title"
                      variant="ghost"
                      class="justify-start font-normal"
                    >
                      {{ option.title }}
                      <span class="ml-auto text-muted-foreground">{{ option.detail }}</span>
                    </Button>
                  </div>
                </div>
                <div class="p-2">
                  <Calendar />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>{{ snoozeLabel }}</TooltipContent>
        </Tooltip>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              :disabled="!mail"
            >
              <ReplyIcon class="size-4" />
              <span class="sr-only">{{ replyLabel }}</span>
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
              <ReplyAllIcon class="size-4" />
              <span class="sr-only">{{ replyAllLabel }}</span>
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
              <ForwardIcon class="size-4" />
              <span class="sr-only">{{ forwardLabel }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ forwardLabel }}</TooltipContent>
        </Tooltip>
      </div>
      <Separator
        orientation="vertical"
        class="mx-2 h-6"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            :disabled="!mail"
          >
            <MoreVerticalIcon class="size-4" />
            <span class="sr-only">{{ moreLabel }}</span>
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
      class="flex flex-1 flex-col"
    >
      <div class="flex items-start gap-4 p-4 text-sm">
        <Avatar size="sm" />
        <div class="grid min-w-0 flex-1 gap-1">
          <div class="font-semibold">
            {{ mail.name }}
          </div>
          <div class="truncate text-xs">
            {{ mail.subject }}
          </div>
          <div class="truncate text-xs">
            <span class="font-medium">{{ replyToLabel }}</span> {{ mail.email }}
          </div>
        </div>
        <div class="ml-auto text-xs text-muted-foreground">
          {{ format(new Date(mail.date), 'PPpp') }}
        </div>
      </div>
      <Separator />
      <div class="flex-1 whitespace-pre-wrap p-4 text-sm">
        {{ mail.text }}
      </div>
      <Separator class="mt-auto" />
      <form class="grid gap-4 p-4">
        <Textarea
          class="p-4"
          :placeholder="`Reply ${mail.name}...`"
        />
        <div class="flex items-center">
          <Label class="flex items-center gap-2 text-xs font-normal">
            <Switch aria-label="Mute thread" />
            {{ muteLabel }}
          </Label>
          <Button
            type="button"
            size="sm"
            class="ml-auto"
          >
            {{ sendLabel }}
          </Button>
        </div>
      </form>
    </div>
    <div
      v-else
      class="p-8 text-center text-muted-foreground"
    >
      {{ emptySelectionLabel }}
    </div>
  </div>
</template>
