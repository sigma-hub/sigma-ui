<script setup lang="ts">
import { computed } from 'vue';
import { docsConfig } from '../config/docs';
import TableOfContent from '../components/TableOfContent.vue';
import NavAside from '../components/NavAside.vue';
import HeaderSection from '../components/HeaderSection.vue';
import EditLink from '../components/EditLink.vue';
import Sponsors from '../components/Sponsors.vue';

const navItemGroups = computed(() => {
  const extendedComponentsGroup = docsConfig.sidebarNav.filter(item => ['extended-components'].includes(item.name || ''));
  const componentsGroup = docsConfig.sidebarNav.filter(item => ['components'].includes(item.name || ''));

  const sortedComponentsGroup = componentsGroup.map((item) => {
    item.items?.sort((a, b) => a.title.localeCompare(b.title));
    return item;
  });

  return [
    ...extendedComponentsGroup,
    ...sortedComponentsGroup,
  ];
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

      <div class="hidden text-sm xl:block">
        <div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
          <TableOfContent />
          <Sponsors />
        </div>
      </div>
    </main>
  </div>
</template>
