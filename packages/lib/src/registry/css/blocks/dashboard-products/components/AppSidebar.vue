<script setup lang="ts">
import { Package2Icon } from '@lucide/vue';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/css/ui/tooltip';
import type { SidebarLink, SidebarLinkTone } from '../data';

defineProps<{
  navItems: SidebarLink[];
  footerItems: SidebarLink[];
  brandName: string;
}>();

function navLinkClass(tone: SidebarLinkTone) {
  if (tone === 'active') {
    return 'dashboard-products__nav-link--active';
  }

  if (tone === 'muted') {
    return 'dashboard-products__nav-link--muted';
  }

  return undefined;
}
</script>

<template>
  <aside class="dashboard-products__sidebar">
    <nav class="dashboard-products__sidebar-nav">
      <a
        href="#"
        class="dashboard-products__brand"
      >
        <Package2Icon />
        <span class="dashboard-products__sr-only">{{ brandName }}</span>
      </a>
      <TooltipProvider
        v-for="item in navItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="dashboard-products__nav-link"
              :class="navLinkClass(item.tone)"
            >
              <component :is="item.icon" />
              <span class="dashboard-products__sr-only">{{ item.label }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav class="dashboard-products__sidebar-footer">
      <TooltipProvider
        v-for="item in footerItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="dashboard-products__nav-link"
              :class="navLinkClass(item.tone)"
            >
              <component :is="item.icon" />
              <span class="dashboard-products__sr-only">{{ item.label }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>

<style>
@layer components {
  .dashboard-products__sidebar {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    display: none;
    width: calc(var(--spacing) * 14);
    flex-direction: column;
    border-right: 1px solid var(--border);
    background-color: var(--background);
  }

  @media (width >= 40rem) {
    .dashboard-products__sidebar {
      display: flex;
    }
  }

  .dashboard-products__sidebar-nav,
  .dashboard-products__sidebar-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: calc(var(--spacing) * 4) calc(var(--spacing) * 2);
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-products__sidebar-footer {
    margin-top: auto;
  }

  .dashboard-products__brand {
    display: flex;
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background-color: var(--primary);
    color: var(--primary-foreground);
    font-size: 1.125rem;
    font-weight: 600;
    gap: calc(var(--spacing) * 2);
    line-height: 1.75rem;
  }

  @media (width >= 48rem) {
    .dashboard-products__brand {
      width: calc(var(--spacing) * 8);
      height: calc(var(--spacing) * 8);
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  .dashboard-products__brand svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dashboard-products__brand:hover svg {
    transform: scale(1.1);
  }

  .dashboard-products__nav-link {
    display: flex;
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    transition-duration: 150ms;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dashboard-products__nav-link:hover {
    color: var(--foreground);
  }

  .dashboard-products__nav-link--muted {
    color: var(--muted-foreground);
  }

  .dashboard-products__nav-link--active {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  @media (width >= 48rem) {
    .dashboard-products__nav-link {
      width: calc(var(--spacing) * 8);
      height: calc(var(--spacing) * 8);
    }
  }

  .dashboard-products__nav-link svg {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }

  .dashboard-products__sr-only {
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
