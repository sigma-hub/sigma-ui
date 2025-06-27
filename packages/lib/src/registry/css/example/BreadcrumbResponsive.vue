<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { computed, ref } from 'vue';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/registry/css/ui/breadcrumb';
import { Button } from '@ui/registry/css/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@ui/registry/css/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';

const isDesktop = useMediaQuery('(min-width: 768px)');
const isOpen = ref(false);
const items = ref([
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Building Your Application' },
  { href: '#', label: 'Data Fetching' },
  { label: 'Caching and Revalidating' },
]);

const itemsToDisplay = 3;
const firstLabel = computed(() => items.value[0]?.label);

const allButLastTwoItems = computed(() => items.value.slice(1, -2));
const remainingItems = computed(() => items.value.slice(-itemsToDisplay + 1));
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink :href="items[0].href">
          {{ firstLabel }}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <template v-if="items.length > itemsToDisplay">
        <BreadcrumbItem>
          <DropdownMenu
            v-if="isDesktop"
            v-model:open="isOpen"
          >
            <DropdownMenuTrigger
              class="example-sigma-ui-breadcrumb__trigger"
              aria-label="Toggle menu"
            >
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                v-for="item of allButLastTwoItems"
                :key="item.label"
              >
                <a :href="item.href || '#'">
                  {{ item.label }}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Drawer
            v-else
            v-model:open="isOpen"
          >
            <DrawerTrigger aria-label="Toggle Menu">
              <BreadcrumbEllipsis />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader class="example-sigma-ui-breadcrumb__drawer-header">
                <DrawerTitle>Navigate to</DrawerTitle>
                <DrawerDescription>
                  Select a page to navigate to.
                </DrawerDescription>
              </DrawerHeader>
              <div class="example-sigma-ui-breadcrumb__drawer-content">
                <a
                  v-for="item of allButLastTwoItems"
                  :key="item.label"
                  :href="item.href"
                  class="example-sigma-ui-breadcrumb__drawer-link"
                >
                  {{ item.label }}
                </a>
              </div>
              <DrawerFooter class="example-sigma-ui-breadcrumb__drawer-footer">
                <DrawerClose as-child>
                  <Button variant="outline">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </template>
      <BreadcrumbItem
        v-for="item of remainingItems"
        :key="item.label"
      >
        <template v-if="item.href">
          <BreadcrumbLink
            as-child
            class="example-sigma-ui-breadcrumb__truncated-link"
          >
            <a :href="item.href">
              {{ item.label }}
            </a>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </template>
        <BreadcrumbPage
          v-else
          class="example-sigma-ui-breadcrumb__truncated-page"
        >
          {{ item.label }}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<style>
.example-sigma-ui-breadcrumb__trigger {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.example-sigma-ui-breadcrumb__drawer-header {
  text-align: left;
}

.example-sigma-ui-breadcrumb__drawer-content {
  display: grid;
  gap: 0.25rem;
  padding: 0 1rem;
}

.example-sigma-ui-breadcrumb__drawer-link {
  padding: 0.25rem 0;
  font-size: 0.875rem;
}

.example-sigma-ui-breadcrumb__drawer-footer {
  padding-top: 1rem;
}

.example-sigma-ui-breadcrumb__truncated-link,
.example-sigma-ui-breadcrumb__truncated-page {
  max-width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .example-sigma-ui-breadcrumb__truncated-link,
  .example-sigma-ui-breadcrumb__truncated-page {
    max-width: none;
  }
}
</style>
