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
} from '@ui/registry/tailwind/ui/command';
import { DialogDescription, DialogTitle } from '@ui/registry/tailwind/ui/dialog';
import { Kbd, KbdGroup } from '@ui/registry/tailwind/ui/kbd';
import type { PaletteCommand } from '../data';
import { useShortcutKeys } from '../platform';

const props = defineProps<{
  commands: PaletteCommand[];
  recentIds: string[];
}>();

const { formatKeys } = useShortcutKeys();

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
    <DialogTitle class="sr-only">
      Command palette
    </DialogTitle>
    <DialogDescription class="sr-only">
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
          class="gap-2"
          @select="select(command)"
        >
          <ClockIcon class="size-4 shrink-0 text-muted-foreground" />
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
          class="gap-2"
          @select="select(command)"
        >
          <component
            :is="command.icon"
            class="size-4 shrink-0 text-muted-foreground"
          />
          {{ command.label }}
          <CommandShortcut v-if="command.shortcut">
            <KbdGroup>
              <Kbd
                v-for="key in formatKeys(command.shortcut)"
                :key="key"
              >
                {{ key }}
              </Kbd>
            </KbdGroup>
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
    <div class="flex items-center gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
      <span class="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> Navigate</span>
      <span class="flex items-center gap-1.5"><Kbd>Enter</Kbd> Run</span>
      <span class="ml-auto flex items-center gap-1.5"><Kbd>Esc</Kbd> Close</span>
    </div>
  </CommandDialog>
</template>
