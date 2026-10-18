<script setup lang="ts">
import { MenuIcon, Package2Icon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/tailwind/ui/sheet';
import type { AccountMenuEntry, NavLink } from '../data';
import SearchForm from './SearchForm.vue';
import UserMenu from './UserMenu.vue';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  searchPlaceholder: string;
  menuEntries: AccountMenuEntry[];
  userMenuLabel: string;
  navigationLabel: string;
}>();
</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <a
        :href="brandHref"
        class="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2Icon class="h-6 w-6" />
        <span class="sr-only">{{ brandName }}</span>
      </a>
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="transition-colors hover:text-foreground"
        :class="link.isActive ? 'text-foreground' : 'text-muted-foreground'"
      >
        {{ link.label }}
      </a>
    </nav>
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
      <SheetContent side="left">
        <nav class="grid gap-6 text-lg font-medium">
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
            :class="link.isActive ? 'hover:text-foreground' : 'text-muted-foreground hover:text-foreground'"
          >
            {{ link.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <SearchForm :placeholder="searchPlaceholder" />
      <UserMenu
        :entries="menuEntries"
        :trigger-label="userMenuLabel"
      />
    </div>
  </header>
</template>
