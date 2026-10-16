<script setup lang="ts">
import { CircleUserIcon, MenuIcon, Package2Icon, SearchIcon } from 'lucide-vue-next';
import { Button } from '@ui/registry/tailwind/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/tailwind/ui/dropdown-menu';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/tailwind/ui/sheet';
import type { NavLink } from '../data';

defineProps<{
  brandName: string;
  links: NavLink[];
  searchPlaceholder: string;
  menuLabel: string;
  accountLabel: string;
  accountMenuLabel: string;
  accountMenuGroups: string[][];
}>();
</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <a
        href="#"
        class="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2Icon class="h-6 w-6" />
        <span class="sr-only">{{ brandName }}</span>
      </a>
      <a
        v-for="link in links"
        :key="link.label"
        href="#"
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
          <span class="sr-only">{{ menuLabel }}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="grid gap-6 text-lg font-medium">
          <a
            href="#"
            class="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2Icon class="h-6 w-6" />
            <span class="sr-only">{{ brandName }}</span>
          </a>
          <a
            v-for="link in links"
            :key="link.label"
            href="#"
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
            <span class="sr-only">{{ accountLabel }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{{ accountMenuLabel }}</DropdownMenuLabel>
          <template
            v-for="group in accountMenuGroups"
            :key="group.join('-')"
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="item in group"
              :key="item"
            >
              {{ item }}
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
