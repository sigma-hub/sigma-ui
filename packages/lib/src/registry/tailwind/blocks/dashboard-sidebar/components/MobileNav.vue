<script setup lang="ts">
import { MenuIcon, Package2Icon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/tailwind/ui/sheet';
import type { NavLink } from '../data';
import UpgradeCard from './UpgradeCard.vue';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  navigationLabel: string;
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeActionLabel: string;
}>();
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        class="shrink-0 md:hidden"
      >
        <MenuIcon class="h-5 w-5" />
        <span class="sr-only">{{ navigationLabel }}</span>
      </Button>
    </SheetTrigger>
    <SheetContent
      side="left"
      class="flex flex-col"
    >
      <nav class="grid gap-2 text-lg font-medium">
        <a
          :href="brandHref"
          class="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2Icon class="h-6 w-6" />
          <span class="sr-only">{{ brandName }}</span>
        </a>
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
          :class="link.isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'"
        >
          <component
            :is="link.icon"
            class="h-5 w-5"
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
      <div class="mt-auto">
        <UpgradeCard
          :title="upgradeTitle"
          :description="upgradeDescription"
          :action-label="upgradeActionLabel"
        />
      </div>
    </SheetContent>
  </Sheet>
</template>
