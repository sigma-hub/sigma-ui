<script setup lang="ts">
import { computed } from 'vue';
import { CheckIcon, TriangleAlertIcon, XIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card } from '@ui/registry/tailwind/ui/card';
import { Progress } from '@ui/registry/tailwind/ui/progress';
import { Spinner } from '@ui/registry/tailwind/ui/spinner';
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
  <Card class="flex h-full flex-col gap-4 p-4">
    <div class="flex items-start gap-3">
      <div
        class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg]:size-5"
        aria-hidden="true"
      >
        <component :is="app.icon" />
      </div>
      <div class="flex min-w-0 flex-1 flex-col">
        <h3 class="truncate text-sm leading-5 font-semibold">
          {{ app.name }}
        </h3>
        <p class="truncate text-xs text-muted-foreground">
          by {{ app.publisher }}
        </p>
      </div>
      <Badge :variant="app.badge === 'official' ? 'default' : 'secondary'">
        {{ badgeLabel }}
      </Badge>
    </div>

    <p class="line-clamp-2 flex-1 text-sm text-muted-foreground">
      {{ app.description }}
    </p>

    <div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <Badge variant="outline">
        {{ app.category }}
      </Badge>
      <span>{{ versionLabel }}</span>
      <span
        v-if="hasUpdate"
        class="text-foreground"
      >
        v{{ app.version }} available
      </span>
    </div>

    <p
      v-if="app.incompatibleReason && !app.installed"
      class="flex items-center gap-2 text-xs text-destructive"
      role="note"
    >
      <TriangleAlertIcon
        class="size-4 shrink-0"
        aria-hidden="true"
      />
      {{ app.incompatibleReason }}
    </p>

    <Progress
      v-if="isBusy"
      :model-value="app.progress ?? 0"
      :aria-label="`${busyLabel} ${app.name}`"
    />

    <div class="flex items-center gap-2">
      <template v-if="isBusy">
        <Button
          class="flex-1"
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
          class="flex-1"
          @click="emit('update', app.id)"
        >
          Update
        </Button>
        <Button
          v-if="manage"
          class="flex-1"
          variant="outline"
          @click="emit('uninstall', app.id)"
        >
          Uninstall
        </Button>
        <Button
          v-else-if="!hasUpdate"
          class="flex-1"
          variant="secondary"
          disabled
        >
          <CheckIcon />
          Installed
        </Button>
      </template>
      <Button
        v-else
        class="flex-1"
        :disabled="Boolean(app.incompatibleReason)"
        @click="emit('install', app.id)"
      >
        Install
      </Button>
    </div>
  </Card>
</template>
