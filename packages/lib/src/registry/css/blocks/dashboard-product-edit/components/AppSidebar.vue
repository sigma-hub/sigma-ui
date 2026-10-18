<script setup lang="ts">
import { Package2Icon } from '@lucide/vue';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/registry/css/ui/tooltip';
import { sidebarFooterNavItems, sidebarNavItems } from '../data';
</script>

<template>
  <aside class="dashboard-product-edit__sidebar">
    <nav class="dashboard-product-edit__sidebar-nav">
      <a
        href="#"
        class="dashboard-product-edit__logo"
      >
        <Package2Icon />
        <span class="dashboard-product-edit__visually-hidden">Acme Inc</span>
      </a>
      <TooltipProvider
        v-for="item in sidebarNavItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="dashboard-product-edit__nav-link"
              :class="{ 'dashboard-product-edit__nav-link--active': item.isActive }"
            >
              <component :is="item.icon" />
              <span class="dashboard-product-edit__visually-hidden">{{ item.label }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            {{ item.label }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav class="dashboard-product-edit__sidebar-nav dashboard-product-edit__sidebar-nav--end">
      <TooltipProvider
        v-for="item in sidebarFooterNavItems"
        :key="item.label"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="dashboard-product-edit__nav-link"
            >
              <component :is="item.icon" />
              <span class="dashboard-product-edit__visually-hidden">{{ item.label }}</span>
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
.dashboard-product-edit__sidebar {
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
  .dashboard-product-edit__sidebar {
    display: flex;
  }
}

.dashboard-product-edit__sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: calc(var(--spacing) * 2);
  padding-left: calc(var(--spacing) * 2);
  gap: calc(var(--spacing) * 4);
}

@media (width >= 40rem) {
  .dashboard-product-edit__sidebar-nav {
    padding-top: calc(var(--spacing) * 5);
    padding-bottom: calc(var(--spacing) * 5);
  }
}

.dashboard-product-edit__sidebar-nav--end {
  margin-top: auto;
}

.dashboard-product-edit__logo {
  display: flex;
  width: calc(var(--spacing) * 9);
  height: calc(var(--spacing) * 9);
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  gap: calc(var(--spacing) * 2);
  line-height: 1.75rem;
  text-decoration: none;
}

@media (width >= 48rem) {
  .dashboard-product-edit__logo {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-product-edit__logo svg {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-product-edit__logo:hover svg {
  transform: scale(1.1);
}

.dashboard-product-edit__nav-link {
  display: flex;
  width: calc(var(--spacing) * 9);
  height: calc(var(--spacing) * 9);
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  color: var(--muted-foreground);
  text-decoration: none;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-product-edit__nav-link:hover {
  color: var(--foreground);
}

@media (width >= 48rem) {
  .dashboard-product-edit__nav-link {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
  }
}

.dashboard-product-edit__nav-link--active {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.dashboard-product-edit__nav-link svg {
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
}

.dashboard-product-edit__visually-hidden {
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
