<script setup lang="ts">
import {
  CircleUserIcon,
  Package2Icon,
  PanelLeftIcon,
  SearchIcon,
} from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@ui/registry/tailwind/ui/dropdown-menu';
import { Input } from '@ui/registry/tailwind/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/registry/tailwind/ui/breadcrumb';
import { Sheet, SheetContent, SheetTrigger } from '@ui/registry/tailwind/ui/sheet';
import { breadcrumbLinks, breadcrumbPage, mobileNavItems } from '../data';
</script>

<template>
  <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    <Sheet>
      <SheetTrigger as-child>
        <Button
          size="icon"
          variant="outline"
          class="sm:hidden"
        >
          <PanelLeftIcon class="h-5 w-5" />
          <span class="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        class="sm:max-w-xs"
      >
        <nav class="grid gap-6 text-lg font-medium">
          <a
            href="#"
            class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2Icon class="h-5 w-5 transition-all group-hover:scale-110" />
            <span class="sr-only">Acme Inc</span>
          </a>
          <a
            v-for="item in mobileNavItems"
            :key="item.label"
            href="#"
            class="flex items-center gap-4 px-2.5"
            :class="item.isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
          >
            <component
              :is="item.icon"
              class="h-5 w-5"
            />
            {{ item.label }}
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <Breadcrumb class="hidden md:flex">
      <BreadcrumbList>
        <template
          v-for="link in breadcrumbLinks"
          :key="link.label"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <a :href="link.href">{{ link.label }}</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </template>
        <BreadcrumbItem>
          <BreadcrumbPage>{{ breadcrumbPage }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="relative ml-auto flex-1 md:grow-0">
      <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="secondary"
          size="icon"
          class="rounded-full"
        >
          <CircleUserIcon class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
