<script setup lang="ts">
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/registry/tailwind/ui/tooltip';
import type { FolderLink } from '../data';

defineProps<{
  collapsed: boolean;
  links: FolderLink[];
}>();
</script>

<template>
  <nav
    class="grid gap-1 px-2 py-2"
    :class="{ 'justify-items-center': collapsed }"
  >
    <template
      v-for="link in links"
      :key="link.title"
    >
      <Tooltip v-if="collapsed">
        <TooltipTrigger as-child>
          <a
            href="#"
            :class="buttonVariants({ variant: link.isActive ? 'default' : 'ghost', size: 'icon' })"
            class="size-9"
            @click.prevent
          >
            <component
              :is="link.icon"
              class="size-4"
            />
            <span class="sr-only">{{ link.title }}</span>
          </a>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          class="flex items-center gap-4"
        >
          {{ link.title }}
          <span
            v-if="link.label"
            class="text-muted-foreground"
          >
            {{ link.label }}
          </span>
        </TooltipContent>
      </Tooltip>
      <a
        v-else
        href="#"
        :class="buttonVariants({ variant: link.isActive ? 'default' : 'ghost', size: 'sm' })"
        class="w-full justify-start"
        @click.prevent
      >
        <component
          :is="link.icon"
          class="mr-2 size-4"
        />
        {{ link.title }}
        <span
          v-if="link.label"
          class="ml-auto"
          :class="link.isActive ? 'text-primary-foreground' : 'text-muted-foreground'"
        >
          {{ link.label }}
        </span>
      </a>
    </template>
  </nav>
</template>
