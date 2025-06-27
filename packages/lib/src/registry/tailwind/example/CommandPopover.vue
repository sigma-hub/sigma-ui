<script setup lang="ts">
import { ref } from 'vue';
import {
  ArrowUpCircleIcon,
  CheckCircle2Icon,
  CircleIcon,
  HelpCircleIcon,
  XCircleIcon,
} from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/registry/tailwind/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/tailwind/ui/popover';

interface Status {
  value: string;
  label: string;
  icon: typeof ArrowUpCircleIcon;
}

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircleIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: ArrowUpCircleIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2Icon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircleIcon,
  },
];

const open = ref(false);
const selectedStatus = ref<Status>();
</script>

<template>
  <div class="flex items-center space-x-4">
    <p class="text-sm text-muted-foreground">
      Status
    </p>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="w-[150px] justify-start"
        >
          <template v-if="selectedStatus">
            <component
              :is="selectedStatus?.icon"
              class="mr-2 h-4 w-4 shrink-0"
            />
            {{ selectedStatus?.label }}
          </template>
          <template v-else>
            + Set status
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="p-0"
        side="right"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
                @select="(value) => {
                  selectedStatus = status
                  open = false
                }"
              >
                <component
                  :is="status.icon"
                  :key="status.value"
                  :class="cn('mr-2 h-4 w-4', status.value === selectedStatus?.value ? 'opacity-100' : 'opacity-40',
                  )"
                />
                <span>{{ status.label }}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
