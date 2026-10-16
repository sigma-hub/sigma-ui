<script setup lang="ts">
import { CircleUserIcon, MenuIcon, Package2Icon, SearchIcon } from 'lucide-vue-next';
import { Badge } from '@ui/registry/tailwind/ui/badge';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/tailwind/ui/dropdown-menu';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/tailwind/ui/sheet';
import type { SidebarLink } from '../data';

defineProps<{
  brandName: string;
  links: SidebarLink[];
  searchPlaceholder: string;
  menuLabel: string;
  accountLabel: string;
  accountMenuLabel: string;
  accountMenuGroups: string[][];
  upgradeTitle: string;
  upgradeDescription: string;
  upgradeAction: string;
}>();
</script>

<template>
  <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
      <SheetContent
        side="left"
        class="flex flex-col"
      >
        <nav class="grid gap-2 text-lg font-medium">
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
          <Card>
            <CardHeader>
              <CardTitle>{{ upgradeTitle }}</CardTitle>
              <CardDescription>
                {{ upgradeDescription }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                class="w-full"
              >
                {{ upgradeAction }}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
    <div class="w-full flex-1">
      <form>
        <div class="relative">
          <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            :placeholder="searchPlaceholder"
            class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
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
  </header>
</template>
