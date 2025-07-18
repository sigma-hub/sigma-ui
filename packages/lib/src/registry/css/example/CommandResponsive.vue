<script lang="ts" setup>
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { ref } from 'vue';
import { Button } from '@ui/registry/css/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/registry/css/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@ui/registry/css/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/registry/css/ui/popover';

interface Status {
  value: string;
  label: string;
}

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
  },
  {
    value: 'todo',
    label: 'Todo',
  },
  {
    value: 'in progress',
    label: 'In Progress',
  },
  {
    value: 'done',
    label: 'Done',
  },
  {
    value: 'canceled',
    label: 'Canceled',
  },
];

const [UseTemplate, StatusList] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');

const isOpen = ref(false);
const selectedStatus = ref<Status | null>(null);

function onStatusSelect(status: Status) {
  selectedStatus.value = status;
  isOpen.value = false;
}
</script>

<template>
  <div class="example-sigma-ui-command-responsive">
    <UseTemplate>
      <Command>
        <CommandInput placeholder="Filter status..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="status of statuses"
              :key="status.value"
              :value="status.value"
              @select="onStatusSelect(status)"
            >
              {{ status.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </UseTemplate>

    <Popover
      v-if="isDesktop"
      v-model:open="isOpen"
    >
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          class="example-sigma-ui-command-responsive__trigger"
        >
          {{ selectedStatus ? selectedStatus.label : "+ Set status" }}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="example-sigma-ui-command-responsive__content"
        align="start"
      >
        <StatusList />
      </PopoverContent>
    </Popover>

    <Drawer
      v-else
      :open="isOpen"
      @update:open="(newOpenValue) => isOpen = newOpenValue"
    >
      <DrawerTrigger as-child>
        <Button
          variant="outline"
          class="example-sigma-ui-command-responsive__trigger"
        >
          {{ selectedStatus ? selectedStatus.label : "+ Set status" }}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div class="example-sigma-ui-command-responsive__drawer-content">
          <StatusList />
        </div>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<style>
.example-sigma-ui-command-responsive__trigger {
  width: 150px;
  justify-content: flex-start;
}

.example-sigma-ui-command-responsive__content {
  width: 200px;
  padding: 0;
}

.example-sigma-ui-command-responsive__drawer-content {
  border-top: 1px solid hsl(var(--border));
  margin-top: 1rem;
}
</style>
