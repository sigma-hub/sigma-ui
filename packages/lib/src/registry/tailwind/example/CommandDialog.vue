<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { ref, watch } from 'vue';
import { toast } from '@ui/registry/tailwind/ui/toaster';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ui/registry/tailwind/ui/command';

const open = ref(false);

const { Meta_J, Ctrl_J } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
    }
  },
});

watch([Meta_J, Ctrl_J], (v) => {
  if (v[0] || v[1]) {
    handleOpenChange();
  }
});

function handleOpenChange() {
  open.value = !open.value;
}

function handleSelect(event: any) {
  if (event.detail?.value) {
    toast('Selected command', {
      description: `You selected: ${event.detail.value}`,
    });
    open.value = false;
  }
}
</script>

<template>
  <div>
    <p class="text-sm text-muted-foreground">
      Press
      <kbd
        class="pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-2 py-1 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
      >
        <span class="text-xs">⌘</span>
        <span class="text-sm">J</span>
      </kbd>
    </p>
    <CommandDialog v-model:open="open">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            value="calendar"
            @select="handleSelect"
          >
            Calendar
          </CommandItem>
          <CommandItem
            value="search-emoji"
            @select="handleSelect"
          >
            Search Emoji
          </CommandItem>
          <CommandItem
            value="calculator"
            @select="handleSelect"
          >
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem
            value="profile"
            @select="handleSelect"
          >
            Profile
          </CommandItem>
          <CommandItem
            value="billing"
            @select="handleSelect"
          >
            Billing
          </CommandItem>
          <CommandItem
            value="settings"
            @select="handleSelect"
          >
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
