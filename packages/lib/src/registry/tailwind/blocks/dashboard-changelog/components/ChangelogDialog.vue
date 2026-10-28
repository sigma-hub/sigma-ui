<script setup lang="ts">
import { ref, watch } from 'vue';
import { BugIcon, InfoIcon, SparklesIcon, WrenchIcon } from '@lucide/vue';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/tailwind/ui/alert';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/registry/tailwind/ui/dialog';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Switch } from '@ui/registry/tailwind/ui/switch';
import { changeTypeLabels } from '../data';
import type { ChangeType, Release } from '../data';

const props = defineProps<{
  releases: Release[];
  currentVersion: string;
}>();

const open = defineModel<boolean>('open', { default: false });
const showOnUpdate = defineModel<boolean>('showOnUpdate', { default: true });

const selectedVersion = ref(props.currentVersion);

const changeIcons = {
  added: SparklesIcon,
  improved: WrenchIcon,
  fixed: BugIcon,
};

watch(open, (isOpen) => {
  if (isOpen) {
    selectedVersion.value = props.currentVersion;
  }
});

function getRelease(version: string) {
  return props.releases.find(release => release.version === version) ?? props.releases[0];
}

function getChangeLabel(type: ChangeType) {
  return changeTypeLabels[type];
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>What's new</DialogTitle>
        <DialogDescription>
          Release notes for every version, newest first.
        </DialogDescription>
      </DialogHeader>

      <div class="flex h-[min(26rem,60dvh)] min-w-0 flex-col gap-4 sm:flex-row">
        <nav
          aria-label="Releases"
          class="flex max-w-full min-w-0 shrink-0 gap-1 overflow-x-auto sm:w-48 sm:flex-col sm:overflow-x-visible sm:overflow-y-auto"
        >
          <button
            v-for="release in releases"
            :key="release.version"
            type="button"
            class="flex shrink-0 items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm outline-none hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:bg-secondary data-[active=true]:font-medium"
            :data-active="release.version === selectedVersion"
            :aria-current="release.version === selectedVersion ? 'true' : undefined"
            @click="selectedVersion = release.version"
          >
            <span class="flex flex-col">
              <span>{{ release.version }}</span>
              <span class="hidden text-xs font-normal text-muted-foreground sm:inline">{{ release.date }}</span>
            </span>
            <Badge
              v-if="release.version === currentVersion"
              variant="outline"
            >
              Current
            </Badge>
          </button>
        </nav>

        <article
          class="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto sm:pr-1"
          :aria-label="`Version ${getRelease(selectedVersion).version} release notes`"
        >
          <div class="flex flex-col gap-0.5">
            <h3 class="text-lg leading-7 font-semibold">
              Version {{ getRelease(selectedVersion).version }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ getRelease(selectedVersion).date }}
            </p>
          </div>

          <Alert>
            <InfoIcon />
            <AlertTitle>Highlights</AlertTitle>
            <AlertDescription>{{ getRelease(selectedVersion).highlight }}</AlertDescription>
          </Alert>

          <section
            v-for="section in getRelease(selectedVersion).sections"
            :key="section.type"
            class="flex flex-col gap-2"
          >
            <h4 class="flex items-center gap-2 text-sm font-semibold">
              <component
                :is="changeIcons[section.type]"
                class="size-4 text-muted-foreground"
              />
              {{ getChangeLabel(section.type) }}
            </h4>
            <ul class="flex list-disc flex-col gap-1.5 pl-9 text-sm marker:text-muted-foreground">
              <li
                v-for="item in section.items"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </section>
        </article>
      </div>

      <DialogFooter class="items-center gap-3 sm:justify-between">
        <div class="flex items-center gap-2">
          <Switch
            id="dashboard-changelog-show-on-update"
            v-model="showOnUpdate"
          />
          <Label for="dashboard-changelog-show-on-update">
            Show after each update
          </Label>
        </div>
        <Button
          variant="outline"
          @click="open = false"
        >
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
