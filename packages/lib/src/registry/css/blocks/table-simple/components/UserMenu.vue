<script setup lang="ts">
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Button } from '@ui/registry/css/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';
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
        class="table-simple__user-button"
      >
        <Avatar size="sm" />
        <span class="table-simple__sr-only">{{ triggerLabel }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="table-simple__user-menu"
      align="end"
    >
      <template
        v-for="entry in entries"
        :key="entry.id"
      >
        <DropdownMenuLabel
          v-if="entry.kind === 'label'"
          class="table-simple__user-label"
        >
          <div class="table-simple__user-identity">
            <p class="table-simple__user-name">
              {{ entry.label }}
            </p>
            <p
              v-if="entry.detail"
              class="table-simple__user-email"
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

<style>
.table-simple__user-button {
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
}

.table-simple__user-menu {
  width: 14rem;
}

.table-simple__user-label {
  font-weight: 400;
}

.table-simple__user-identity {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.table-simple__user-name,
.table-simple__user-email {
  margin: 0;
  line-height: 1;
}

.table-simple__user-name {
  font-size: 0.875rem;
  font-weight: 500;
}

.table-simple__user-email {
  color: var(--muted-foreground);
  font-size: 0.75rem;
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
</style>
