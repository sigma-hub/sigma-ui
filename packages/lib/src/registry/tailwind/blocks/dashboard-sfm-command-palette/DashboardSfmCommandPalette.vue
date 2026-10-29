<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { SearchIcon, SparklesIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@ui/registry/tailwind/ui/empty';
import { Kbd, KbdGroup } from '@ui/registry/tailwind/ui/kbd';
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
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6">
    <header class="flex flex-col gap-1">
      <h2 class="text-2xl leading-8 font-bold tracking-tight">
        {{ pageTitle }}
      </h2>
      <p class="text-muted-foreground">
        {{ pageDescription }}
      </p>
    </header>

    <Button
      variant="outline"
      class="h-10 w-full justify-start gap-2 font-normal text-muted-foreground"
      aria-keyshortcuts="Control+K Meta+K"
      @click="isPaletteOpen = true"
    >
      <SearchIcon />
      <span class="flex-1 text-left">{{ triggerLabel }}</span>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>

    <section
      class="flex flex-col gap-3"
      aria-live="polite"
    >
      <Empty
        v-if="!lastCommand"
        class="border border-dashed"
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
        class="flex items-center gap-3 rounded-lg border p-4"
      >
        <component
          :is="lastCommand.icon"
          class="size-5 shrink-0 text-muted-foreground"
        />
        <div class="flex min-w-0 flex-1 flex-col">
          <span class="text-xs text-muted-foreground">Last command</span>
          <span class="truncate font-medium">{{ lastCommand.label }}</span>
        </div>
        <Badge variant="secondary">
          {{ lastCommand.group }}
        </Badge>
      </div>

      <div
        v-if="recentCommands.length > 0"
        class="flex flex-wrap items-center gap-2"
      >
        <span class="text-sm text-muted-foreground">Recent</span>
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
