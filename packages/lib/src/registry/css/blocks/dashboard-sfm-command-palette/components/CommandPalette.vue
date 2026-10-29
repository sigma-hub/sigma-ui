<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ClockIcon } from '@lucide/vue';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@ui/registry/css/ui/command';
import { DialogDescription, DialogTitle } from '@ui/registry/css/ui/dialog';
import { Kbd, KbdGroup } from '@ui/registry/css/ui/kbd';
import type { PaletteCommand } from '../data';

const props = defineProps<{
  commands: PaletteCommand[];
  recentIds: string[];
}>();

const open = defineModel<boolean>('open', { default: false });

const emit = defineEmits<{
  select: [command: PaletteCommand];
}>();

const query = ref('');
const isSearching = computed(() => query.value.trim().length > 0);

const recentCommands = computed(() => {
  return props.recentIds
    .map(id => props.commands.find(command => command.id === id))
    .filter((command): command is PaletteCommand => Boolean(command));
});

/** While the search is empty, recent commands move to their own group so no command is listed twice. */
const groups = computed(() => {
  const recentIdSet = new Set(isSearching.value ? [] : props.recentIds);
  const visible = props.commands.filter(command => !recentIdSet.has(command.id));

  return [...new Set(visible.map(command => command.group))].map(name => ({
    name,
    commands: visible.filter(command => command.group === name),
  }));
});

watch(open, (isOpen) => {
  if (isOpen) {
    query.value = '';
  }
});

function onInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value;
}

function select(command: PaletteCommand) {
  emit('select', command);
  open.value = false;
}
</script>

<template>
  <CommandDialog v-model:open="open">
    <DialogTitle class="dashboard-sfm-command-palette__visually-hidden">
      Command palette
    </DialogTitle>
    <DialogDescription class="dashboard-sfm-command-palette__visually-hidden">
      Search for a command and press Enter to run it.
    </DialogDescription>
    <CommandInput
      placeholder="Type a command or search…"
      @input="onInput"
    />
    <CommandList>
      <CommandEmpty>No commands found.</CommandEmpty>
      <CommandGroup
        v-if="!isSearching && recentCommands.length > 0"
        heading="Recent"
      >
        <CommandItem
          v-for="command in recentCommands"
          :key="command.id"
          :value="command.id"
          class="dashboard-sfm-command-palette__item"
          @select="select(command)"
        >
          <ClockIcon class="dashboard-sfm-command-palette__item-icon" />
          {{ command.label }}
        </CommandItem>
      </CommandGroup>
      <CommandGroup
        v-for="group in groups"
        :key="group.name"
        :heading="group.name"
      >
        <CommandItem
          v-for="command in group.commands"
          :key="command.id"
          :value="command.id"
          :keywords="[command.label, ...(command.keywords ?? [])]"
          class="dashboard-sfm-command-palette__item"
          @select="select(command)"
        >
          <component
            :is="command.icon"
            class="dashboard-sfm-command-palette__item-icon"
          />
          {{ command.label }}
          <CommandShortcut v-if="command.shortcut">
            <KbdGroup>
              <Kbd
                v-for="key in command.shortcut"
                :key="key"
              >
                {{ key }}
              </Kbd>
            </KbdGroup>
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
    <div class="dashboard-sfm-command-palette__footer">
      <span class="dashboard-sfm-command-palette__hint"><Kbd>↑</Kbd><Kbd>↓</Kbd> Navigate</span>
      <span class="dashboard-sfm-command-palette__hint"><Kbd>Enter</Kbd> Run</span>
      <span class="dashboard-sfm-command-palette__hint dashboard-sfm-command-palette__hint-close"><Kbd>Esc</Kbd> Close</span>
    </div>
  </CommandDialog>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-sfm-command-palette__visually-hidden {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    border: 0;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .dashboard-sfm-command-palette__item.dashboard-sfm-command-palette__item {
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-sfm-command-palette__item-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
    color: var(--muted-foreground);
  }

  .dashboard-sfm-command-palette__footer {
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
    border-top: 1px solid var(--border);
    color: var(--muted-foreground);
    font-size: 0.75rem;
    gap: calc(var(--spacing) * 4);
    line-height: 1rem;
  }

  .dashboard-sfm-command-palette__hint {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 1.5);
  }

  .dashboard-sfm-command-palette__hint-close {
    margin-left: auto;
  }
}
</style>
