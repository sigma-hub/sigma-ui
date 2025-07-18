<script setup lang="ts">
import { ref } from 'vue';
import {
  ArrowUpCircleIcon,
  CheckCircle2Icon,
  CircleIcon,
  HelpCircleIcon,
  XCircleIcon,
} from 'lucide-vue-next';
import { Button } from '@ui/registry/css/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@ui/registry/css/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/css/ui/popover';

interface Status {
  value: string;
  label: string;
  icon: typeof HelpCircleIcon;
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
  <div class="example-sigma-ui-command-popover">
    <p class="example-sigma-ui-command-popover__label">
      Status
    </p>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="example-sigma-ui-command-popover__trigger"
        >
          <template v-if="selectedStatus">
            <component
              :is="selectedStatus?.icon"
              class="example-sigma-ui-command-popover__icon"
            />
            {{ selectedStatus?.label }}
          </template>
          <template v-else>
            + Set status
          </template>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="example-sigma-ui-command-popover__content"
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
                  class="example-sigma-ui-command-popover__status-icon"
                  :class="{ 'example-sigma-ui-command-popover__status-icon--selected': status.value === selectedStatus?.value }"
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

<style>
.example-sigma-ui-command-popover {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.example-sigma-ui-command-popover__label {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}

.example-sigma-ui-command-popover__trigger {
  width: 150px;
  justify-content: flex-start;
}

.example-sigma-ui-command-popover__icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.example-sigma-ui-command-popover__content {
  padding: 0;
}

.example-sigma-ui-command-popover__status-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  opacity: 0.4;
}

.example-sigma-ui-command-popover__status-icon--selected {
  opacity: 1;
}
</style>
