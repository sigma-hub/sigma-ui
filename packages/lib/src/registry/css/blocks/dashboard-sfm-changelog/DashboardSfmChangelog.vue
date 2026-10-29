<script setup lang="ts">
import { ref } from 'vue';
import { MegaphoneIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import ChangelogDialog from './components/ChangelogDialog.vue';
import { currentVersion, pageDescription, pageTitle, releases } from './data';

const isDialogOpen = ref(false);
const showOnUpdate = ref(true);
const latestRelease = releases[0];
</script>

<template>
  <div class="dashboard-sfm-changelog">
    <header class="dashboard-sfm-changelog__header">
      <h2 class="dashboard-sfm-changelog__title">
        {{ pageTitle }}
      </h2>
      <p class="dashboard-sfm-changelog__description">
        {{ pageDescription }}
      </p>
    </header>

    <section
      class="dashboard-sfm-changelog__summary"
      aria-label="Latest release"
    >
      <span class="dashboard-sfm-changelog__summary-icon">
        <MegaphoneIcon class="dashboard-sfm-changelog__summary-glyph" />
      </span>
      <div class="dashboard-sfm-changelog__summary-text">
        <div class="dashboard-sfm-changelog__summary-heading">
          <span class="dashboard-sfm-changelog__summary-version">Version {{ currentVersion }}</span>
          <Badge>New</Badge>
          <span class="dashboard-sfm-changelog__summary-date">{{ latestRelease.date }}</span>
        </div>
        <p class="dashboard-sfm-changelog__summary-highlight">
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

<style>
@layer base, components;

@layer components {
  .dashboard-sfm-changelog {
    display: flex;
    width: 100%;
    max-width: 48rem;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    margin-inline: auto;
    gap: calc(var(--spacing) * 6);
  }

  .dashboard-sfm-changelog__header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-sfm-changelog__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    line-height: 2rem;
  }

  .dashboard-sfm-changelog__description {
    margin: 0;
    color: var(--muted-foreground);
  }

  .dashboard-sfm-changelog__summary {
    display: flex;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-sfm-changelog__summary-icon {
    display: flex;
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background-color: var(--muted);
    color: var(--muted-foreground);
  }

  .dashboard-sfm-changelog__summary-glyph {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .dashboard-sfm-changelog__summary-text {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-sfm-changelog__summary-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-sfm-changelog__summary-version {
    font-weight: 500;
  }

  .dashboard-sfm-changelog__summary-date {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  .dashboard-sfm-changelog__summary-highlight {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  @media (width >= 40rem) {
    .dashboard-sfm-changelog {
      padding: calc(var(--spacing) * 6);
    }

    .dashboard-sfm-changelog__summary {
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>
