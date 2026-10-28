<script setup lang="ts">
import { ref, watch } from 'vue';
import { BugIcon, InfoIcon, SparklesIcon, WrenchIcon } from '@lucide/vue';
import { Alert, AlertDescription, AlertTitle } from '@ui/registry/css/ui/alert';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/registry/css/ui/dialog';
import { Label } from '@ui/registry/css/ui/label';
import { Switch } from '@ui/registry/css/ui/switch';
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
    <DialogContent class="dashboard-changelog__dialog">
      <DialogHeader>
        <DialogTitle>What's new</DialogTitle>
        <DialogDescription>
          Release notes for every version, newest first.
        </DialogDescription>
      </DialogHeader>

      <div class="dashboard-changelog__body">
        <nav
          aria-label="Releases"
          class="dashboard-changelog__releases"
        >
          <button
            v-for="release in releases"
            :key="release.version"
            type="button"
            class="dashboard-changelog__release-button"
            :data-active="release.version === selectedVersion"
            :aria-current="release.version === selectedVersion ? 'true' : undefined"
            @click="selectedVersion = release.version"
          >
            <span class="dashboard-changelog__release-text">
              <span>{{ release.version }}</span>
              <span class="dashboard-changelog__release-date">{{ release.date }}</span>
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
          class="dashboard-changelog__notes"
          :aria-label="`Version ${getRelease(selectedVersion).version} release notes`"
        >
          <div class="dashboard-changelog__notes-heading">
            <h3 class="dashboard-changelog__notes-title">
              Version {{ getRelease(selectedVersion).version }}
            </h3>
            <p class="dashboard-changelog__notes-date">
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
            class="dashboard-changelog__section"
          >
            <h4 class="dashboard-changelog__section-title">
              <component
                :is="changeIcons[section.type]"
                class="dashboard-changelog__section-icon"
              />
              {{ getChangeLabel(section.type) }}
            </h4>
            <ul class="dashboard-changelog__items">
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

      <DialogFooter class="dashboard-changelog__footer">
        <div class="dashboard-changelog__preference">
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

<style>
@layer base, components;

@layer components {
  .dashboard-changelog__body {
    display: flex;
    min-width: 0;
    height: min(26rem, 60dvh);
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-changelog__releases {
    display: flex;
    max-width: 100%;
    min-width: 0;
    flex-shrink: 0;
    overflow-x: auto;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-changelog__release-button {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
    border: 0;
    background: transparent;
    border-radius: var(--radius-md);
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 2);
    line-height: 1.25rem;
    outline: none;
    text-align: left;
  }

  .dashboard-changelog__release-button:hover {
    background-color: var(--muted);
  }

  .dashboard-changelog__release-button:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent);
  }

  .dashboard-changelog__release-button[data-active="true"] {
    background-color: var(--secondary);
    font-weight: 500;
  }

  .dashboard-changelog__release-text {
    display: flex;
    flex-direction: column;
  }

  .dashboard-changelog__release-date {
    display: none;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    font-weight: 400;
  }

  .dashboard-changelog__notes {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-changelog__notes-heading {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 0.5);
  }

  .dashboard-changelog__notes-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  .dashboard-changelog__notes-date {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  .dashboard-changelog__section {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-changelog__section-title {
    display: flex;
    align-items: center;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-changelog__section-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
  }

  .dashboard-changelog__items {
    display: flex;
    flex-direction: column;
    padding: 0 0 0 calc(var(--spacing) * 9);
    margin: 0;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 1.5);
    list-style: disc;
  }

  .dashboard-changelog__items li::marker {
    color: var(--muted-foreground);
  }

  .dashboard-changelog__footer.dashboard-changelog__footer {
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-changelog__preference {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  @media (width >= 40rem) {
    .dashboard-changelog__dialog.dashboard-changelog__dialog {
      max-width: 48rem;
    }

    .dashboard-changelog__body {
      flex-direction: row;
    }

    .dashboard-changelog__releases {
      width: 12rem;
      flex-direction: column;
      overflow: visible auto;
    }

    .dashboard-changelog__release-date {
      display: inline;
    }

    .dashboard-changelog__notes {
      padding-right: calc(var(--spacing) * 1);
    }

    .dashboard-changelog__footer.dashboard-changelog__footer {
      justify-content: space-between;
    }
  }
}
</style>
