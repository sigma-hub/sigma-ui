<script setup lang="ts">
import { CircleUserIcon, MenuIcon, Package2Icon, SearchIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/tailwind/ui/dropdown-menu';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/tailwind/ui/sheet';
import type { AccountMenuEntry, NavLink } from '../data';

defineProps<{
  brandName: string;
  brandHref: string;
  links: NavLink[];
  searchPlaceholder: string;
  navigationLabel: string;
  userMenuLabel: string;
  accountMenu: AccountMenuEntry[];
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
            class="hover:text-foreground"
            :class="link.isActive ? undefined : 'text-muted-foreground'"
          >
            {{ link.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form class="ml-auto flex-1 sm:flex-initial">
        <div class="relative">
          <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            :placeholder="searchPlaceholder"
            class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="secondary"
            size="icon"
            class="rounded-full"
          >
            <CircleUserIcon class="h-5 w-5" />
            <span class="sr-only">{{ userMenuLabel }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <template
            v-for="entry in accountMenu"
            :key="entry.id"
          >
            <DropdownMenuLabel v-if="entry.kind === 'label'">
              {{ entry.label }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator v-else-if="entry.kind === 'separator'" />
            <DropdownMenuItem v-else-if="entry.kind === 'action'">
              {{ entry.label }}
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
