<script lang="ts" setup>
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/registry/css/ui/dropdown-menu';

interface BreadcrumbItemType {
  href?: string;
  label: string;
}

const maxVisibleItems = ref(3);

const items = ref<BreadcrumbItemType[]>([
  { href: '/', label: 'Home' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 1' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 2' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 3' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 4' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 5' },
]);

const visibleItems = computed(() => {
  if (items.value.length <= maxVisibleItems.value) {
    return items.value;
  }

  return [
    items.value[0],
    ...items.value.slice(-2),
  ];
});

const hiddenItems = computed(() => {
  if (items.value.length <= maxVisibleItems.value) {
    return [];
  }

  return items.value.slice(1, -2);
});

const showEllipsis = computed(() => items.value.length > maxVisibleItems.value);
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-if="items.length > 0">
        <BreadcrumbItem>
          <BreadcrumbLink
            v-if="items[0].href"
            :href="items[0].href"
          >
            {{ items[0].label }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ items[0].label }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="items.length > 1" />
      </template>

      <template v-if="showEllipsis">
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger class="example-sigma-ui-breadcrumb__trigger">
              <BreadcrumbEllipsis />
              <span class="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                v-for="item in hiddenItems"
                :key="item.label"
              >
                <a
                  v-if="item.href"
                  :href="item.href"
                >{{ item.label }}
                </a>
                <span v-else>{{ item.label }}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </template>

      <template
        v-for="(item, index) in visibleItems.slice(1)"
        :key="item.label"
      >
        <BreadcrumbItem>
          <template v-if="item.href && index !== visibleItems.length - 2">
            <BreadcrumbLink :href="item.href">
              {{ item.label }}
            </BreadcrumbLink>
          </template>
          <template v-else>
            <BreadcrumbPage>{{ item.label }}</BreadcrumbPage>
          </template>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < visibleItems.length - 2" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<style>
.example-sigma-ui-breadcrumb__trigger {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
