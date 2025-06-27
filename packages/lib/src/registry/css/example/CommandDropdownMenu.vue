<script setup lang="ts">
import { ref } from 'vue';
import { CalendarIcon, MoreHorizontalIcon, TagsIcon, TrashIcon, UserIcon } from 'lucide-vue-next';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';

const labels = [
  'feature',
  'bug',
  'enhancement',
  'documentation',
  'design',
  'question',
  'maintenance',
];

const labelRef = ref('feature');
const open = ref(false);
</script>

<template>
  <div class="example-sigma-ui-command-dropdown">
    <p class="example-sigma-ui-command-dropdown__text">
      <span class="example-sigma-ui-command-dropdown__label">
        {{ labelRef }}
      </span>
      <span class="example-sigma-ui-command-dropdown__description">Create a new project</span>
    </p>
    <DropdownMenu v-model:open="open">
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          size="sm"
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        class="example-sigma-ui-command-dropdown__content"
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon class="example-sigma-ui-command-dropdown__icon" />
            Assign to...
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CalendarIcon class="example-sigma-ui-command-dropdown__icon" />
            Set due date...
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TagsIcon class="example-sigma-ui-command-dropdown__icon" />
              Apply label
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent class="example-sigma-ui-command-dropdown__sub-content">
              <Command>
                <CommandInput
                  placeholder="Filter label..."
                  auto-focus
                />
                <CommandList>
                  <CommandEmpty>No label found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      v-for="label in labels"
                      :key="label"
                      :value="label"
                      @select="(event) => {
                        labelRef = event.detail.value as string
                        open = false
                      }"
                    >
                      {{ label }}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="example-sigma-ui-command-dropdown__delete">
            <TrashIcon class="example-sigma-ui-command-dropdown__icon" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<style>
.example-sigma-ui-command-dropdown {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  padding: 0.75rem 1rem;
}

@media (min-width: 640px) {
  .example-sigma-ui-command-dropdown {
    flex-direction: row;
    align-items: center;
  }
}

.example-sigma-ui-command-dropdown__text {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-command-dropdown__label {
  margin-right: 0.5rem;
  border-radius: var(--radius-lg);
  background-color: hsl(var(--primary));
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: hsl(var(--primary-foreground));
}

.example-sigma-ui-command-dropdown__description {
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-command-dropdown__content {
  width: 200px;
}

.example-sigma-ui-command-dropdown__icon {
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
}

.example-sigma-ui-command-dropdown__sub-content {
  padding: 0;
}

.example-sigma-ui-command-dropdown__delete {
  color: hsl(var(--destructive));
}
</style>
