<script setup lang="ts">
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from 'lucide-vue-next';
import { toast } from '@ui/registry/css/ui/toaster';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@ui/registry/css/ui/command';

function handleSelect(event: any) {
  if (event.detail?.value) {
    toast('Selected command', {
      description: `You selected: ${event.detail.value}`,
    });
  }
}
</script>

<template>
  <Command class="example-sigma-ui-command">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem
          value="Calendar"
          @select="handleSelect"
        >
          <CalendarIcon class="example-sigma-ui-command__icon" />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem
          value="Search Emoji"
          @select="handleSelect"
        >
          <SmileIcon class="example-sigma-ui-command__icon" />
          <span>Search Emoji</span>
        </CommandItem>
        <CommandItem
          value="Calculator"
          @select="handleSelect"
        >
          <CalculatorIcon class="example-sigma-ui-command__icon" />
          <span>Calculator</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem
          value="Profile"
          @select="handleSelect"
        >
          <UserIcon class="example-sigma-ui-command__icon" />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="Billing"
          @select="handleSelect"
        >
          <CreditCardIcon class="example-sigma-ui-command__icon" />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="Settings"
          @select="handleSelect"
        >
          <SettingsIcon class="example-sigma-ui-command__icon" />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>

<style>
.example-sigma-ui-command {
  max-width: 450px;
  border-radius: var(--radius-lg);
  border: 1px solid hsl(var(--border));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.example-sigma-ui-command__icon {
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
}
</style>
