<script lang="ts" setup>
import { ref } from 'vue';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/registry/css/ui/breadcrumb';

interface BreadcrumbItemType {
  href?: string;
  label: string;
}

const items = ref<BreadcrumbItemType[]>([
  { href: '/', label: 'Home' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 1' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 2' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 3' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 4' },
  { href: '/docs/components/breadcrumb.html', label: 'Nesting level 5' },
]);
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template
        v-for="(item, index) in items"
        :key="item.label"
      >
        <BreadcrumbItem>
          <template v-if="item.href && index !== items.length - 1">
            <BreadcrumbLink :href="item.href">
              {{ item.label }}
            </BreadcrumbLink>
          </template>
          <template v-else>
            <BreadcrumbPage>{{ item.label }}</BreadcrumbPage>
          </template>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
