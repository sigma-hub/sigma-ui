<script setup lang="ts">
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
import type { AccountMenuEntry } from '../data';

defineProps<{
  entries: AccountMenuEntry[];
  triggerLabel: string;
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="relative size-8 rounded-full"
      >
        <Avatar size="sm" />
        <span class="sr-only">{{ triggerLabel }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-56"
      align="end"
    >
      <template
        v-for="entry in entries"
        :key="entry.id"
      >
        <DropdownMenuLabel
          v-if="entry.kind === 'label'"
          class="font-normal"
        >
          <div class="flex flex-col gap-1">
            <p class="text-sm leading-none font-medium">
              {{ entry.label }}
            </p>
            <p
              v-if="entry.detail"
              class="text-xs leading-none text-muted-foreground"
            >
              {{ entry.detail }}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator v-else-if="entry.kind === 'separator'" />
        <DropdownMenuItem v-else-if="entry.kind === 'action'">
          {{ entry.label }}
          <DropdownMenuShortcut v-if="entry.shortcut">
            {{ entry.shortcut }}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
