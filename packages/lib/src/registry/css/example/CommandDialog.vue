<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { ref, watch } from 'vue';
import { toast } from '@ui/registry/css/ui/toaster';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@ui/registry/css/ui/command';

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
    <p class="example-sigma-ui-command-dialog__text">
      Press
      <kbd class="example-sigma-ui-command-dialog__kbd">
        <span class="example-sigma-ui-command-dialog__kbd-meta">⌘</span>
        <span class="example-sigma-ui-command-dialog__kbd-key">J</span>
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

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-command-dialog__text {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  .example-sigma-ui-command-dialog__kbd {
    display: inline-flex;
    align-items: center;
    padding: calc(var(--spacing) * 1) calc(var(--spacing) * 2);
    border-radius: var(--radius-sm);
    background-color: var(--muted);
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    gap: calc(var(--spacing) * 1);
    pointer-events: none;
  }

  .example-sigma-ui-command-dialog__kbd-meta {
    font-size: 0.75rem;
  }

  .example-sigma-ui-command-dialog__kbd-key {
    font-size: 0.875rem;
  }
}
</style>
