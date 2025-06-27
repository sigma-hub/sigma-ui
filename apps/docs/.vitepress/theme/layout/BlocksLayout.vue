<script setup lang="ts">
import { computed } from 'vue';
import { docsConfig } from '../config/docs';
import EditLink from '../components/EditLink.vue';
import NavAside from '../components/NavAside.vue';
import HeaderSection from '../components/HeaderSection.vue';

const navItemGroups = computed(() => (
  docsConfig.sidebarNav.filter(item => ['blocks'].includes(item.name || ''))
));
</script>

<template>
  <div class="border-b pb-12">
    <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <NavAside :nav-item-groups="navItemGroups" />

      <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr]">
        <div class="mx-auto w-full min-w-0">
          <InfoLabel
            text="Alpha preview"
          />
          <HeaderSection />
          <div class="vp-doc">
            <slot />
          </div>
          <EditLink />
        </div>
      </main>
    </div>
  </div>
</template>
