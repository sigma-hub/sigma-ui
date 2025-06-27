<script setup lang="ts">
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';
import { GithubIcon } from 'lucide-vue-next';
import PageHeader from '../components/PageHeader.vue';
import PageHeaderHeading from '../components/PageHeaderHeading.vue';
import PageHeaderDescription from '../components/PageHeaderDescription.vue';
import PageAction from '../components/PageAction.vue';
import Announcement from '../components/Announcement.vue';
import ExamplesDemoHeader from '../components/ExamplesDemoHeader.vue';
import ExamplesDemo from '../../theme/components/ExamplesDemo.vue';
</script>

<template>
  <PageHeader class="page-header">
    <Announcement />
    <PageHeaderHeading>Sigma-UI components</PageHeaderHeading>
    <PageHeaderDescription>
      Well designed <span class="whitespace-nowrap font-mono bg-muted dark:bg-muted/60 font-bold rounded-md px-2 py-1">Vue</span> components. Copy to your project with a single
      <span class="whitespace-nowrap font-mono bg-muted dark:bg-muted/60 font-bold rounded-md px-2 py-1">npx sigma-ui add</span>
      command.
      <br>Using GOAT (Git Obtained As Template) distribution method.
      <br>Built on Radix. Minimally styled. Accessible. Fully customizable. Open Source.
    </PageHeaderDescription>
    <PageAction>
      <a
        href="/docs/introduction"
        :class="cn(buttonVariants(), 'rounded-[6px]')"
      >
        Get Started
      </a>
      <a
        href="https://github.com/sigma-hub/sigma-ui"
        target="_blank"
        :class="cn(
          buttonVariants({ variant: 'outline' }),
          'rounded-[6px]',
        )"
      >
        <GithubIcon class="mr-2 h-4 w-4" />
        GitHub
      </a>
    </PageAction>
  </PageHeader>
  <div class="mb-4 text-2xl font-bold">
    Examples
  </div>
  <ExamplesDemoHeader class="sticky top-[64px] backdrop-blur bg-card/50 z-20" />
  <ExamplesDemo class="mt-8 mb-12" />
</template>
