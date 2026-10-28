<script setup lang="ts">
import { computed } from 'vue';
import { CheckIcon, TriangleAlertIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
import { Card } from '@ui/registry/css/ui/card';
import { Progress } from '@ui/registry/css/ui/progress';
import { Spinner } from '@ui/registry/css/ui/spinner';
import type { MarketplaceApp } from '../data';

const props = withDefaults(defineProps<{
  app: MarketplaceApp;
  /** Show the uninstall action for installed apps. */
  manage?: boolean;
  featured?: boolean;
}>(), {
  manage: false,
  featured: false,
});

const emit = defineEmits<{
  install: [id: string];
  update: [id: string];
  uninstall: [id: string];
  cancel: [id: string];
}>();

const isBusy = computed(() => props.app.progress !== null);
const hasUpdate = computed(() => props.app.installed && props.app.installedVersion !== props.app.version);
const busyLabel = computed(() => (props.app.installed ? 'Updating…' : 'Installing…'));
const versionLabel = computed(() => `v${props.app.installedVersion ?? props.app.version}`);
const badgeLabel = computed(() => (props.app.badge === 'official' ? 'Official' : 'Community'));
</script>

<template>
  <Card class="dashboard-marketplace__card">
    <div class="dashboard-marketplace__top">
      <div
        class="dashboard-marketplace__icon"
        aria-hidden="true"
      >
        <component :is="app.icon" />
      </div>
      <div class="dashboard-marketplace__heading">
        <h3 class="dashboard-marketplace__name">
          {{ app.name }}
        </h3>
        <p class="dashboard-marketplace__publisher">
          by {{ app.publisher }}
        </p>
      </div>
      <Badge :variant="app.badge === 'official' ? 'default' : 'secondary'">
        {{ badgeLabel }}
      </Badge>
    </div>

    <p class="dashboard-marketplace__card-description">
      {{ app.description }}
    </p>

    <div class="dashboard-marketplace__meta">
      <Badge variant="outline">
        {{ app.category }}
      </Badge>
      <span>{{ versionLabel }}</span>
      <span
        v-if="hasUpdate"
        class="dashboard-marketplace__update-hint"
      >
        v{{ app.version }} available
      </span>
    </div>

    <p
      v-if="app.incompatibleReason && !app.installed"
      class="dashboard-marketplace__warning"
      role="note"
    >
      <TriangleAlertIcon
        class="dashboard-marketplace__warning-icon"
        aria-hidden="true"
      />
      {{ app.incompatibleReason }}
    </p>

    <Progress
      v-if="isBusy"
      :model-value="app.progress ?? 0"
      :aria-label="`${busyLabel} ${app.name}`"
    />

    <div class="dashboard-marketplace__actions">
      <template v-if="isBusy">
        <Button
          class="dashboard-marketplace__action"
          variant="secondary"
          disabled
        >
          <Spinner />
          {{ busyLabel }}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          :aria-label="`Cancel ${busyLabel.toLowerCase()} ${app.name}`"
          @click="emit('cancel', app.id)"
        >
          <XIcon />
        </Button>
      </template>
      <template v-else-if="app.installed">
        <Button
          v-if="hasUpdate"
          class="dashboard-marketplace__action"
          @click="emit('update', app.id)"
        >
          Update
        </Button>
        <Button
          v-if="manage"
          class="dashboard-marketplace__action"
          variant="outline"
          @click="emit('uninstall', app.id)"
        >
          Uninstall
        </Button>
        <Button
          v-else-if="!hasUpdate"
          class="dashboard-marketplace__action"
          variant="secondary"
          disabled
        >
          <CheckIcon />
          Installed
        </Button>
      </template>
      <Button
        v-else
        class="dashboard-marketplace__action"
        :disabled="Boolean(app.incompatibleReason)"
        @click="emit('install', app.id)"
      >
        Install
      </Button>
    </div>
  </Card>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-marketplace__card {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-marketplace__top {
    display: flex;
    align-items: flex-start;
    gap: calc(var(--spacing) * 3);
  }

  .dashboard-marketplace__icon {
    display: flex;
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    background-color: var(--muted);
    color: var(--foreground);
  }

  .dashboard-marketplace__icon svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .dashboard-marketplace__heading {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
  }

  .dashboard-marketplace__name,
  .dashboard-marketplace__publisher {
    overflow: hidden;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .dashboard-marketplace__name {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
  }

  .dashboard-marketplace__publisher {
    color: var(--muted-foreground);
    font-size: 0.75rem;
    line-height: 1rem;
  }

  .dashboard-marketplace__card-description {
    display: -webkit-box;
    overflow: hidden;
    flex: 1;
    margin: 0;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .dashboard-marketplace__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    gap: calc(var(--spacing) * 2);
    line-height: 1rem;
  }

  .dashboard-marketplace__update-hint {
    color: var(--foreground);
  }

  .dashboard-marketplace__warning {
    display: flex;
    align-items: center;
    margin: 0;
    color: var(--destructive);
    font-size: 0.75rem;
    gap: calc(var(--spacing) * 2);
    line-height: 1rem;
  }

  .dashboard-marketplace__warning-icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
  }

  .dashboard-marketplace__actions {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .dashboard-marketplace__action.dashboard-marketplace__action {
    flex: 1;
  }
}
</style>
