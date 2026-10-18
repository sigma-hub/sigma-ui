<script setup lang="ts">
import { Package2Icon } from 'lucide-vue-next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/css/ui/tooltip';
import type { NavItem } from '../data';

defineProps<{
  navItems: NavItem[];
  footerItems: NavItem[];
  brandName: string;
}>();
</script>

<template>
  <aside class="dashboard-orders__sidebar">
    <nav class="dashboard-orders__sidebar-nav">
      <a
        href="#"
        class="dashboard-orders__brand"
      >
        <Package2Icon />
        <span class="dashboard-orders__sr-only">{{ brandName }}</span>
      </a>
      <TooltipProvider
        v-for="item in navItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="dashboard-orders__nav-link"
              :class="{ 'dashboard-orders__nav-link--active': item.isActive }"
            >
              <component :is="item.icon" />
              <span class="dashboard-orders__sr-only">{{ item.label }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav class="dashboard-orders__sidebar-footer">
      <TooltipProvider
        v-for="item in footerItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="dashboard-orders__nav-link"
              :class="{ 'dashboard-orders__nav-link--active': item.isActive }"
            >
              <component :is="item.icon" />
              <span class="dashboard-orders__sr-only">{{ item.label }}</span>
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
.dashboard-orders__sidebar {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  display: none;
  width: 3.5rem;
  flex-direction: column;
  border-right: 1px solid var(--border);
  background-color: var(--background);
}

@media (width >= 40rem) {
  .dashboard-orders__sidebar {
    display: flex;
  }
}

.dashboard-orders__sidebar-nav,
.dashboard-orders__sidebar-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  gap: 1rem;
}

.dashboard-orders__sidebar-footer {
  margin-top: auto;
}

@media (width >= 40rem) {
  .dashboard-orders__sidebar-nav,
  .dashboard-orders__sidebar-footer {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
}

.dashboard-orders__brand {
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  gap: 0.5rem;
  line-height: 1.75rem;
}

@media (width >= 48rem) {
  .dashboard-orders__brand {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-orders__brand svg {
  width: 1rem;
  height: 1rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-orders__brand:hover svg {
  transform: scale(1.1);
}

.dashboard-orders__nav-link {
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  color: var(--muted-foreground);
  transition-duration: 150ms;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-orders__nav-link:hover {
  color: var(--foreground);
}

.dashboard-orders__nav-link--active {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

@media (width >= 48rem) {
  .dashboard-orders__nav-link {
    width: 2rem;
    height: 2rem;
  }
}

.dashboard-orders__nav-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-orders__sr-only {
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
</style>
