<script setup lang="ts">
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from 'lucide-vue-next';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@ui/registry/tailwind/ui/command';

function handleSelect(event: any) {
  if (event.detail?.value) {
    toast('Selected command', {
      description: `You selected: ${event.detail.value}`,
    });
  }
}
</script>

<template>
  <Command class="rounded-lg border shadow-md max-w-[450px]">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem
          value="Calendar"
          @select="handleSelect"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem
          value="Search Emoji"
          @select="handleSelect"
        >
          <SmileIcon class="mr-2 h-4 w-4" />
          <span>Search Emoji</span>
        </CommandItem>
        <CommandItem
          value="Calculator"
          @select="handleSelect"
        >
          <CalculatorIcon class="mr-2 h-4 w-4" />
          <span>Calculator</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem
          value="Profile"
          @select="handleSelect"
        >
          <UserIcon class="mr-2 h-4 w-4" />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="Billing"
          @select="handleSelect"
        >
          <CreditCardIcon class="mr-2 h-4 w-4" />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem
          value="Settings"
          @select="handleSelect"
        >
          <SettingsIcon class="mr-2 h-4 w-4" />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
