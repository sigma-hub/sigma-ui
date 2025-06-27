<script setup lang="ts">
import { useData } from 'vitepress';
import { CodeXmlIcon, ExternalLinkIcon, FolderGit2Icon } from 'lucide-vue-next';
import DocsBreadcrumb from '../components/DocsBreadcrumb.vue';
import { SOURCE_CODE_PAGE_LINK } from '@/consts/app';

const { frontmatter } = useData();
</script>

<template>
  <div>
    <DocsBreadcrumb class="mb-4" />

    <div class="space-y-2">
      <div class="flex items-center space-x-4">
        <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
          {{ frontmatter.title }}
        </h1>
        <InfoLabel
          v-if="frontmatter.label"
          :text="frontmatter.label"
        />
      </div>
      <p class="text-lg text-muted-foreground">
        {{ frontmatter.description }}
      </p>
    </div>

    <div class="flex items-center space-x-2 pt-4">
      <a
        v-if="frontmatter.docs"
        :href="frontmatter.docs"
        target="_blank"
        class="inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
      >
        <ExternalLinkIcon class="mr-2 w-4 h-4" />
        Docs
      </a>
      <a
        v-if="frontmatter.source"
        :href="SOURCE_CODE_PAGE_LINK + frontmatter.source"
        target="_blank"
        class="inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
      >
        <CodeXmlIcon class="mr-2 w-4 h-4" />
        Component Source
      </a>
      <a
        v-if="frontmatter.primitive"
        :href="frontmatter.primitive"
        target="_blank"
        class="inline-flex items-center rounded-md border px-3 py-1 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
      >
        <FolderGit2Icon class="mr-2 w-4 h-4" />
        Primitive API Reference
      </a>
    </div>
  </div>
</template>
