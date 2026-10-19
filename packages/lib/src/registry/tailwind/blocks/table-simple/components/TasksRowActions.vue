<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import { computed } from 'vue';
import { EllipsisIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@ui/registry/tailwind/ui/dropdown-menu';
import {
  copyLabel,
  deleteLabel,
  deleteShortcut,
  editLabel,
  favoriteLabel,
  labels,
  labelsMenuLabel,
  openRowMenuLabel,
  taskSchema,
  type Task,
} from '../data';
import type { TasksTableFeatures } from './features';

const props = defineProps<{
  row: Row<TasksTableFeatures, Task>;
}>();

const task = computed(() => taskSchema.parse(props.row.original));
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex size-8 p-0 data-[state=open]:bg-muted"
      >
        <EllipsisIcon class="size-4" />
        <span class="sr-only">{{ openRowMenuLabel }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="w-40"
    >
      <DropdownMenuItem>{{ editLabel }}</DropdownMenuItem>
      <DropdownMenuItem>{{ copyLabel }}</DropdownMenuItem>
      <DropdownMenuItem>{{ favoriteLabel }}</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>{{ labelsMenuLabel }}</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup :model-value="task.label">
            <DropdownMenuRadioItem
              v-for="label in labels"
              :key="label.value"
              :value="label.value"
            >
              {{ label.label }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        {{ deleteLabel }}
        <DropdownMenuShortcut>{{ deleteShortcut }}</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
