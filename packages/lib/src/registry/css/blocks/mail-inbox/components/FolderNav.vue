<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/registry/css/ui/tooltip';
import type { FolderLink } from '../data';

defineProps<{
  collapsed: boolean;
  links: FolderLink[];
}>();
</script>

<template>
  <nav
    class="mail-inbox__nav"
    :class="{ 'mail-inbox__nav--collapsed': collapsed }"
  >
    <template
      v-for="link in links"
      :key="link.title"
    >
      <Tooltip v-if="collapsed">
        <TooltipTrigger as-child>
          <a
            href="#"
            class="mail-inbox__nav-link mail-inbox__nav-link--icon"
            :class="{ 'mail-inbox__nav-link--active': link.isActive }"
            @click.prevent
          >
            <component
              :is="link.icon"
              class="mail-inbox__icon"
            />
            <span class="mail-inbox__sr-only">{{ link.title }}</span>
          </a>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          class="mail-inbox__tooltip"
        >
          {{ link.title }}
          <span
            v-if="link.label"
            class="mail-inbox__tooltip-count"
          >
            {{ link.label }}
          </span>
        </TooltipContent>
      </Tooltip>
      <a
        v-else
        href="#"
        class="mail-inbox__nav-link"
        :class="{ 'mail-inbox__nav-link--active': link.isActive }"
        @click.prevent
      >
        <component
          :is="link.icon"
          class="mail-inbox__icon"
        />
        {{ link.title }}
        <span
          v-if="link.label"
          class="mail-inbox__nav-count"
          :class="{ 'mail-inbox__nav-count--active': link.isActive }"
        >
          {{ link.label }}
        </span>
      </a>
    </template>
  </nav>
</template>

<style>
@layer components {
  .mail-inbox__nav {
    display: grid;
    padding: calc(var(--spacing) * 2);
    gap: calc(var(--spacing) * 1);
  }

  .mail-inbox__nav--collapsed {
    justify-items: center;
  }

  .mail-inbox__nav-link {
    display: flex;
    width: 100%;
    align-items: center;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 3);
    border-radius: var(--radius);
    color: var(--foreground);
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 2);
    line-height: 1.25rem;
    text-decoration: none;
  }

  .mail-inbox__nav-link:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  .mail-inbox__nav-link--icon {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
    justify-content: center;
    padding: 0;
  }

  .mail-inbox__nav-link--active,
  .mail-inbox__nav-link--active:hover {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .mail-inbox__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
  }

  .mail-inbox__nav-count {
    margin-left: auto;
    color: var(--muted-foreground);
  }

  .mail-inbox__nav-count--active {
    color: var(--primary-foreground);
  }

  .mail-inbox__tooltip {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .mail-inbox__tooltip-count {
    color: var(--muted-foreground);
  }

  .mail-inbox__sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    border-width: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}
</style>
