<script setup lang="ts">
import { CircleUserIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/tailwind/ui/dropdown-menu';
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
        variant="secondary"
        size="icon"
        class="rounded-full"
      >
        <CircleUserIcon class="h-5 w-5" />
        <span class="sr-only">{{ triggerLabel }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <template
        v-for="entry in entries"
        :key="entry.id"
      >
        <DropdownMenuLabel v-if="entry.kind === 'label'">
          {{ entry.label }}
        </DropdownMenuLabel>
        <DropdownMenuSeparator v-else-if="entry.kind === 'separator'" />
        <DropdownMenuItem v-else-if="entry.kind === 'action'">
          {{ entry.label }}
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
