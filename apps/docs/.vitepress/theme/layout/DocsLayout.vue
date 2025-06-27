<script setup lang="ts">
import { useRoute } from 'vitepress';
import { computed } from 'vue';
import { docsConfig } from '../config/docs';
import TableOfContentVue from '../components/TableOfContent.vue';
import Sponsors from '../components/Sponsors.vue';
import EditLink from '../components/EditLink.vue';
import NavAside from '../components/NavAside.vue';
import HeaderSection from '../components/HeaderSection.vue';

const $route = useRoute();

const navItemGroups = computed(() => {
  if ($route.data.relativePath.includes('docs/components/')) {
    return docsConfig.sidebarNav.filter(item => ['components'].includes(item.name || ''));
  } else if ($route.data.relativePath.includes('docs/blocks/')) {
    return docsConfig.sidebarNav.filter(item => ['blocks'].includes(item.name || ''));
  }

  return docsConfig.sidebarNav.filter(item => ['getting-started', 'installation'].includes(item.name || ''));
});
</script>

<template>
  <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
    <NavAside :nav-item-groups="navItemGroups" />

    <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div class="mx-auto w-full min-w-0">
        <HeaderSection />

        <div class="vp-doc">
          <slot />
        </div>

        <EditLink />
      </div>

      <div class="hidden text-sm xl:block sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
        <TableOfContentVue />
        <Sponsors />
      </div>
    </main>
  </div>
</template>
