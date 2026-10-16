<script setup lang="ts">
import { BellIcon, Package2Icon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import type { NavLink } from '../data';
import UpgradeCard from './UpgradeCard.vue';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  notificationsLabel: string;
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeActionLabel: string;
}>();
</script>

<template>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a
          :href="brandHref"
          class="flex items-center gap-2 font-semibold"
        >
          <Package2Icon class="h-6 w-6" />
          <span>{{ brandName }}</span>
        </a>
        <Button
          variant="outline"
          size="icon"
          class="ml-auto h-8 w-8"
        >
          <BellIcon class="h-4 w-4" />
          <span class="sr-only">{{ notificationsLabel }}</span>
        </Button>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
            :class="link.isActive ? 'bg-muted text-primary' : 'text-muted-foreground'"
          >
            <component
              :is="link.icon"
              class="h-4 w-4"
            />
            {{ link.label }}
            <Badge
              v-if="link.badge"
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              {{ link.badge }}
            </Badge>
          </a>
        </nav>
      </div>
      <div class="mt-auto p-4">
        <UpgradeCard
          compact
          :title="upgradeTitle"
          :description="upgradeDescription"
          :action-label="upgradeActionLabel"
        />
      </div>
    </div>
  </div>
</template>
