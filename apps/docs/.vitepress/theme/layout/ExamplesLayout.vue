<script setup lang="ts">
import PageHeader from '../components/PageHeader.vue';
import PageHeaderHeading from '../components/PageHeaderHeading.vue';
import PageHeaderDescription from '../components/PageHeaderDescription.vue';
import ExamplesDemoNav from '../components/ExamplesDemoNav.vue';
import Announcement from '../components/Announcement.vue';
</script>

<template>
  <div class="container relative">
    <PageHeader class="page-header pb-8">
      <Announcement />
      <PageHeaderHeading class="hidden md:block">
        Check out some examples.
      </PageHeaderHeading>
      <PageHeaderHeading class="md:hidden">
        Examples
      </PageHeaderHeading>
      <PageHeaderDescription>
        Dashboard, cards, authentication. Some examples built using the
        components. Use this as a guide to build your own.
      </PageHeaderDescription>
    </PageHeader>
    <section>
      <ExamplesDemoNav />
      <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <slot />
      </div>
    </section>
  </div>
</template>
