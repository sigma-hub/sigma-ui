<script setup lang="ts">
import { HomeIcon, MonitorIcon, PackageIcon, SquareLibrary } from 'lucide-vue-next';
import { BreadcrumbGenerator } from '@ui/registry/tailwind/ui/breadcrumb';

const basicExampleHome = { label: 'Home', url: '/' };
const basicExampleItems = [
  { label: 'Docs', url: '/docs' },
  { label: 'Components', url: '/docs/components' },
  { label: 'Breadcrumb', url: '/docs/components/breadcrumb.html' },
];

const iconExampleHome = { label: 'Home', icon: HomeIcon, url: '/' };
const iconExampleItems = [
  { label: 'Docs', icon: MonitorIcon, url: '/docs' },
  { label: 'Components', icon: PackageIcon, url: '/docs/components' },
  { label: 'Breadcrumb', icon: SquareLibrary, url: '/docs/components/breadcrumb.html' },
];

const customExampleHome = { icon: HomeIcon, url: '/' };
const customExampleItems = [
  { label: 'Docs', icon: MonitorIcon, url: '/docs' },
  { label: 'Components', icon: PackageIcon, url: '/docs/components' },
  { label: 'Breadcrumb', icon: SquareLibrary, url: '/docs/components/breadcrumb.html' },
];

const routerExampleHome = { label: 'Home', route: { name: 'home' } };
const routerExampleItems = [
  { label: 'Components', route: { name: 'components' } },
  { label: 'Breadcrumb', route: { name: 'breadcrumb' } },
];
</script>

<template>
  <div class="flex flex-col gap-12">
    <div>
      <h3>Basic</h3>
      <BreadcrumbGenerator
        :home="basicExampleHome"
        :model="basicExampleItems"
      />
    </div>

    <div>
      <h3>Basic with icons</h3>
      <BreadcrumbGenerator
        :home="iconExampleHome"
        :model="iconExampleItems"
      />
    </div>

    <div>
      <h3>Custom template</h3>
      <BreadcrumbGenerator
        :home="customExampleHome"
        :model="customExampleItems"
      >
        <template #item="{ item, props }">
          <a
            :href="item.url"
            v-bind="props.action"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              :target="item.target"
              class="h-4 w-4"
            />
          </a>
        </template>
        <template #separator>
          /
        </template>
      </BreadcrumbGenerator>
    </div>

    <div>
      <h3>Router</h3>
      <BreadcrumbGenerator
        :home="routerExampleHome"
        :model="routerExampleItems"
      >
        <template #item="{ item, props }">
          <router-link
            v-if="item.route"
            :to="item.route"
            v-bind="props.action"
            class="flex items-center gap-2"
          >
            <span>{{ item.label }}</span>
          </router-link>
          <a
            v-else
            :href="item.url"
            v-bind="props.action"
            class="flex items-center gap-2"
          >
            <span>{{ item.label }}</span>
          </a>
        </template>
      </BreadcrumbGenerator>
    </div>
  </div>
</template>
