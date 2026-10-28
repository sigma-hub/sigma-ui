<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { PencilIcon, RotateCcwIcon, SearchIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/css/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@ui/registry/css/ui/input-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/registry/css/ui/table';
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
  <div class="settings-shortcuts">
    <header class="settings-shortcuts__header">
      <div class="settings-shortcuts__intro">
        <h2 class="settings-shortcuts__title">
          {{ pageTitle }}
        </h2>
        <p class="settings-shortcuts__description">
          {{ pageDescription }}
        </p>
      </div>
      <div class="settings-shortcuts__toolbar">
        <InputGroup class="settings-shortcuts__search">
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
      class="settings-shortcuts__table-frame"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Command</TableHead>
            <TableHead>Shortcut</TableHead>
            <TableHead class="settings-shortcuts__scope-column">
              When
            </TableHead>
            <TableHead class="settings-shortcuts__actions-column">
              <span class="settings-shortcuts__visually-hidden">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template
            v-for="group in groups"
            :key="group.name"
          >
            <TableRow class="settings-shortcuts__group-row">
              <TableCell
                colspan="4"
                class="settings-shortcuts__group-cell"
              >
                {{ group.name }}
              </TableCell>
            </TableRow>
            <TableRow
              v-for="command in group.commands"
              :key="command.id"
            >
              <TableCell class="settings-shortcuts__command-cell">
                <span class="settings-shortcuts__command-name">
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
              <TableCell class="settings-shortcuts__scope-column settings-shortcuts__scope-cell">
                {{ command.scope }}
              </TableCell>
              <TableCell>
                <div class="settings-shortcuts__row-actions">
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
      class="settings-shortcuts__empty"
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

<style>
@layer base, components;

@layer components {
  .settings-shortcuts {
    display: flex;
    width: 100%;
    max-width: 56rem;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    margin-inline: auto;
    gap: calc(var(--spacing) * 6);
  }

  .settings-shortcuts__header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .settings-shortcuts__intro {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .settings-shortcuts__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .settings-shortcuts__description {
    margin: 0;
    color: var(--muted-foreground);
  }

  .settings-shortcuts__toolbar {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .settings-shortcuts__search {
    flex: 1;
  }

  .settings-shortcuts__table-frame {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .settings-shortcuts__scope-column {
    display: none;
  }

  .settings-shortcuts__scope-cell {
    color: var(--muted-foreground);
  }

  .settings-shortcuts__actions-column.settings-shortcuts__actions-column {
    width: calc(var(--spacing) * 20);
  }

  .settings-shortcuts__visually-hidden {
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

  .settings-shortcuts__group-row.settings-shortcuts__group-row,
  .settings-shortcuts__group-row.settings-shortcuts__group-row:hover {
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }

  .settings-shortcuts__group-cell.settings-shortcuts__group-cell {
    padding-block: calc(var(--spacing) * 2);
    color: var(--muted-foreground);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .settings-shortcuts__command-cell.settings-shortcuts__command-cell {
    font-weight: 500;
  }

  .settings-shortcuts__command-name {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .settings-shortcuts__row-actions {
    display: flex;
    justify-content: flex-end;
    gap: calc(var(--spacing) * 1);
  }

  .settings-shortcuts__empty.settings-shortcuts__empty {
    border: 1px dashed var(--border);
  }

  @media (width >= 40rem) {
    .settings-shortcuts {
      padding: calc(var(--spacing) * 6);
    }

    .settings-shortcuts__header {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }

    .settings-shortcuts__search {
      width: calc(var(--spacing) * 56);
      flex: none;
    }

    .settings-shortcuts__scope-column {
      display: table-cell;
    }
  }
}
</style>
