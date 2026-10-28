<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { SearchIcon, SparklesIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/css/ui/empty';
import { Kbd, KbdGroup } from '@ui/registry/css/ui/kbd';
import CommandPalette from './components/CommandPalette.vue';
import { commands, initialRecentIds, maxRecentCommands, pageDescription, pageTitle, triggerLabel } from './data';
import type { PaletteCommand } from './data';

const isPaletteOpen = ref(false);
const recentIds = ref<string[]>([...initialRecentIds]);
const lastCommand = ref<PaletteCommand | null>(null);
const recentCommands = computed(() => {
  return recentIds.value
    .map(id => commands.find(command => command.id === id))
    .filter((command): command is PaletteCommand => Boolean(command));
});

useEventListener(window, 'keydown', (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    isPaletteOpen.value = !isPaletteOpen.value;
  }
});

function runCommand(command: PaletteCommand) {
  lastCommand.value = command;
  recentIds.value = [command.id, ...recentIds.value.filter(id => id !== command.id)].slice(0, maxRecentCommands);
}
</script>

<template>
  <div class="dashboard-command-palette">
    <header class="dashboard-command-palette__header">
      <h2 class="dashboard-command-palette__title">
        {{ pageTitle }}
      </h2>
      <p class="dashboard-command-palette__description">
        {{ pageDescription }}
      </p>
    </header>

    <Button
      variant="outline"
      class="dashboard-command-palette__trigger"
      aria-keyshortcuts="Control+K Meta+K"
      @click="isPaletteOpen = true"
    >
      <SearchIcon />
      <span class="dashboard-command-palette__trigger-label">{{ triggerLabel }}</span>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>

    <section
      class="dashboard-command-palette__result"
      aria-live="polite"
    >
      <Empty
        v-if="!lastCommand"
        class="dashboard-command-palette__empty"
      >
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SparklesIcon />
          </EmptyMedia>
          <EmptyTitle>No command run yet</EmptyTitle>
          <EmptyDescription>
            Press Ctrl K or use the search box above, then pick a command to run it.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
      <div
        v-else
        class="dashboard-command-palette__last-command"
      >
        <component
          :is="lastCommand.icon"
          class="dashboard-command-palette__last-icon"
        />
        <div class="dashboard-command-palette__last-text">
          <span class="dashboard-command-palette__last-caption">Last command</span>
          <span class="dashboard-command-palette__last-label">{{ lastCommand.label }}</span>
        </div>
        <Badge variant="secondary">
          {{ lastCommand.group }}
        </Badge>
      </div>

      <div
        v-if="recentCommands.length > 0"
        class="dashboard-command-palette__recents"
      >
        <span class="dashboard-command-palette__recents-label">Recent</span>
        <Button
          v-for="command in recentCommands"
          :key="command.id"
          variant="secondary"
          size="sm"
          @click="runCommand(command)"
        >
          <component :is="command.icon" />
          {{ command.label }}
        </Button>
      </div>
    </section>

    <CommandPalette
      v-model:open="isPaletteOpen"
      :commands="commands"
      :recent-ids="recentIds"
      @select="runCommand"
    />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-command-palette {
    display: flex;
    width: 100%;
    max-width: 48rem;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    margin-inline: auto;
    gap: calc(var(--spacing) * 6);
  }

  .dashboard-command-palette__header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-command-palette__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .dashboard-command-palette__description {
    margin: 0;
    color: var(--muted-foreground);
  }

  .dashboard-command-palette__trigger.dashboard-command-palette__trigger {
    width: 100%;
    height: calc(var(--spacing) * 10);
    justify-content: flex-start;
    color: var(--muted-foreground);
    font-weight: 400;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-command-palette__trigger-label {
    flex: 1;
    text-align: left;
  }

  .dashboard-command-palette__result {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-command-palette__empty.dashboard-command-palette__empty {
    border: 1px dashed var(--border);
  }

  .dashboard-command-palette__last-command {
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-command-palette__last-icon {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
    flex-shrink: 0;
    color: var(--muted-foreground);
  }

  .dashboard-command-palette__last-text {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
  }

  .dashboard-command-palette__last-caption {
    color: var(--muted-foreground);
    font-size: 0.75rem;
  }

  .dashboard-command-palette__last-label {
    overflow: hidden;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dashboard-command-palette__recents {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-command-palette__recents-label {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  @media (width >= 40rem) {
    .dashboard-command-palette {
      padding: calc(var(--spacing) * 6);
    }
  }
}
</style>
