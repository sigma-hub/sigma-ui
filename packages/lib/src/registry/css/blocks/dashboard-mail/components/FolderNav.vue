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
    class="dashboard-mail__nav"
    :class="{ 'dashboard-mail__nav--collapsed': collapsed }"
  >
    <template
      v-for="link in links"
      :key="link.title"
    >
      <Tooltip v-if="collapsed">
        <TooltipTrigger as-child>
          <a
            href="#"
            class="dashboard-mail__nav-link dashboard-mail__nav-link--icon"
            :class="{ 'dashboard-mail__nav-link--active': link.isActive }"
            @click.prevent
          >
            <component
              :is="link.icon"
              class="dashboard-mail__icon"
            />
            <span class="dashboard-mail__sr-only">{{ link.title }}</span>
          </a>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          class="dashboard-mail__tooltip"
        >
          {{ link.title }}
          <span
            v-if="link.label"
            class="dashboard-mail__tooltip-count"
          >
            {{ link.label }}
          </span>
        </TooltipContent>
      </Tooltip>
      <a
        v-else
        href="#"
        class="dashboard-mail__nav-link"
        :class="{ 'dashboard-mail__nav-link--active': link.isActive }"
        @click.prevent
      >
        <component
          :is="link.icon"
          class="dashboard-mail__icon"
        />
        {{ link.title }}
        <span
          v-if="link.label"
          class="dashboard-mail__nav-count"
          :class="{ 'dashboard-mail__nav-count--active': link.isActive }"
        >
          {{ link.label }}
        </span>
      </a>
    </template>
  </nav>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-mail__nav {
    display: grid;
    padding: calc(var(--spacing) * 2);
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-mail__nav--collapsed {
    justify-items: center;
  }

  .dashboard-mail__nav-link {
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

  .dashboard-mail__nav-link:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  .dashboard-mail__nav-link--icon {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
    justify-content: center;
    padding: 0;
  }

  .dashboard-mail__nav-link--active,
  .dashboard-mail__nav-link--active:hover {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .dashboard-mail__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
  }

  .dashboard-mail__nav-count {
    margin-left: auto;
    color: var(--muted-foreground);
  }

  .dashboard-mail__nav-count--active {
    color: var(--primary-foreground);
  }

  .dashboard-mail__tooltip {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-mail__tooltip-count {
    color: var(--muted-foreground);
  }

  .dashboard-mail__sr-only {
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
