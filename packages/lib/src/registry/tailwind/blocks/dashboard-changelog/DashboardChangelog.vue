<script setup lang="ts">
import { ref } from 'vue';
import { MegaphoneIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import ChangelogDialog from './components/ChangelogDialog.vue';
import { currentVersion, pageDescription, pageTitle, releases } from './data';

const isDialogOpen = ref(false);
const showOnUpdate = ref(true);
const latestRelease = releases[0];
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

    <section
      class="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
      aria-label="Latest release"
    >
      <span class="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <MegaphoneIcon class="size-5" />
      </span>
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-medium">Version {{ currentVersion }}</span>
          <Badge>New</Badge>
          <span class="text-sm text-muted-foreground">{{ latestRelease.date }}</span>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ latestRelease.highlight }}
        </p>
      </div>
      <Button @click="isDialogOpen = true">
        See what's new
      </Button>
    </section>

    <ChangelogDialog
      v-model:open="isDialogOpen"
      v-model:show-on-update="showOnUpdate"
      :releases="releases"
      :current-version="currentVersion"
    />
  </div>
</template>
