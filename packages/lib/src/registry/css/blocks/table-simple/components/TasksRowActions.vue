<script setup lang="ts">
import type { Row } from '@tanstack/vue-table';
import { computed } from 'vue';
import { EllipsisIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
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
} from '@ui/registry/css/ui/dropdown-menu';
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

const props = defineProps<{
  row: Row<Task>;
}>();

const task = computed(() => taskSchema.parse(props.row.original));
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="table-simple__row-trigger"
      >
        <EllipsisIcon class="table-simple__row-icon" />
        <span class="table-simple__sr-only">{{ openRowMenuLabel }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="table-simple__row-menu"
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

<style>
@layer base, components;

@layer components {
  .table-simple__row-trigger {
    display: flex;
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    padding: 0;
  }

  .table-simple__row-trigger[data-state='open'] {
    background: var(--muted);
  }

  .table-simple__row-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }

  .table-simple__row-menu {
    width: calc(var(--spacing) * 40);
  }

  .table-simple__sr-only {
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
}
</style>
