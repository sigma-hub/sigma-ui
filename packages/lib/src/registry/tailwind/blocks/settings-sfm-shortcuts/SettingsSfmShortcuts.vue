<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { PencilIcon, RotateCcwIcon, SearchIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/tailwind/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@ui/registry/tailwind/ui/input-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/registry/tailwind/ui/table';
import KeybindingDisplay from './components/KeybindingDisplay.vue';
import ShortcutDialog from './components/ShortcutDialog.vue';
import { commands, initialOverrides, pageDescription, pageTitle, searchPlaceholder } from './data';
import { bindingToKeys } from './shortcuts';
import type { Bindings, ShortcutCommand } from './shortcuts';

const bindings = reactive<Bindings>({
  ...Object.fromEntries(commands.map(command => [command.id, command.defaultBinding])),
  ...initialOverrides,
});

const searchQuery = ref('');
const editingId = ref<string | null>(null);
const isDialogOpen = ref(false);

const editingCommand = computed(() => commands.find(command => command.id === editingId.value) ?? null);
const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());

function isModified(command: ShortcutCommand) {
  return bindings[command.id] !== command.defaultBinding;
}

const modifiedCount = computed(() => commands.filter(isModified).length);

const groups = computed(() => {
  const matching = commands.filter((command) => {
    if (!normalizedQuery.value) {
      return true;
    }

    const keysText = bindingToKeys(bindings[command.id]).join(' ').toLowerCase();

    return [command.label, command.group, command.scope].some(value => value.toLowerCase().includes(normalizedQuery.value))
      || keysText.includes(normalizedQuery.value);
  });

  return [...new Set(matching.map(command => command.group))].map(name => ({
    name,
    commands: matching.filter(command => command.group === name),
  }));
});

function edit(command: ShortcutCommand) {
  editingId.value = command.id;
  isDialogOpen.value = true;
}

function resetCommand(command: ShortcutCommand) {
  bindings[command.id] = command.defaultBinding;
}

function resetAll() {
  commands.forEach(resetCommand);
}

function saveBinding(payload: { id: string; binding: string | null; replaceIds: string[] }) {
  payload.replaceIds.forEach((id) => {
    bindings[id] = null;
  });
  bindings[payload.id] = payload.binding;
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl leading-8 font-bold tracking-tight">
          {{ pageTitle }}
        </h2>
        <p class="text-muted-foreground">
          {{ pageDescription }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <InputGroup class="sm:w-56">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder"
            :aria-label="searchPlaceholder"
          />
          <InputGroupAddon
            v-if="searchQuery"
            align="inline-end"
          >
            <InputGroupButton
              size="icon-xs"
              aria-label="Clear search"
              @click="searchQuery = ''"
            >
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button
          variant="outline"
          :disabled="modifiedCount === 0"
          @click="resetAll"
        >
          <RotateCcwIcon />
          Reset all
        </Button>
      </div>
    </header>

    <div
      v-if="groups.length > 0"
      class="overflow-hidden rounded-lg border"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Command</TableHead>
            <TableHead>Shortcut</TableHead>
            <TableHead class="hidden sm:table-cell">
              When
            </TableHead>
            <TableHead class="w-20">
              <span class="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template
            v-for="group in groups"
            :key="group.name"
          >
            <TableRow class="bg-muted/50 hover:bg-muted/50">
              <TableCell
                colspan="4"
                class="py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase"
              >
                {{ group.name }}
              </TableCell>
            </TableRow>
            <TableRow
              v-for="command in group.commands"
              :key="command.id"
            >
              <TableCell class="font-medium">
                <span class="flex flex-wrap items-center gap-2">
                  {{ command.label }}
                  <Badge
                    v-if="isModified(command)"
                    variant="secondary"
                  >
                    Modified
                  </Badge>
                </span>
              </TableCell>
              <TableCell>
                <KeybindingDisplay :binding="bindings[command.id]" />
              </TableCell>
              <TableCell class="hidden text-muted-foreground sm:table-cell">
                {{ command.scope }}
              </TableCell>
              <TableCell>
                <div class="flex justify-end gap-1">
                  <Button
                    v-if="isModified(command)"
                    variant="ghost"
                    size="icon-sm"
                    :aria-label="`Reset shortcut for ${command.label}`"
                    @click="resetCommand(command)"
                  >
                    <RotateCcwIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    :aria-label="`Edit shortcut for ${command.label}`"
                    @click="edit(command)"
                  >
                    <PencilIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <Empty
      v-else
      class="border border-dashed"
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No shortcuts found</EmptyTitle>
        <EmptyDescription>Try searching for a command name or a key such as “Ctrl”.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="sm"
          @click="searchQuery = ''"
        >
          Clear search
        </Button>
      </EmptyContent>
    </Empty>

    <ShortcutDialog
      v-model:open="isDialogOpen"
      :command="editingCommand"
      :commands="commands"
      :bindings="bindings"
      @save="saveBinding"
    />
  </div>
</template>
