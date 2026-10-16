<script setup lang="ts">
import { Package2Icon } from 'lucide-vue-next';
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
.dashboard-products__sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: none;
  width: 3.5rem;
  flex-direction: column;
  border-right: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
}

@media (width >= 640px) {
  .dashboard-products__sidebar {
    display: flex;
  }
}

.dashboard-products__sidebar-nav,
.dashboard-products__sidebar-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.5rem;
}

.dashboard-products__sidebar-footer {
  margin-top: auto;
}

.dashboard-products__brand {
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
}

@media (width >= 768px) {
  .dashboard-products__brand {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-products__brand svg {
  width: 1rem;
  height: 1rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-products__brand:hover svg {
  transform: scale(1.1);
}

.dashboard-products__nav-link {
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  transition-duration: 150ms;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-products__nav-link:hover {
  color: hsl(var(--foreground));
}

.dashboard-products__nav-link--muted {
  color: hsl(var(--muted-foreground));
}

.dashboard-products__nav-link--active {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

@media (width >= 768px) {
  .dashboard-products__nav-link {
    width: 2rem;
    height: 2rem;
  }
}

.dashboard-products__nav-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-products__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
