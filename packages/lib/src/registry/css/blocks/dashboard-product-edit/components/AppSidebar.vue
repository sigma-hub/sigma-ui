<script setup lang="ts">
import { Package2Icon } from 'lucide-vue-next';
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
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: none;
  width: 3.5rem;
  flex-direction: column;
  border-right: 1px solid var(--border);
  background-color: var(--background);
}

@media (width >= 640px) {
  .dashboard-product-edit__sidebar {
    display: flex;
  }
}

.dashboard-product-edit__sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

@media (width >= 640px) {
  .dashboard-product-edit__sidebar-nav {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
}

.dashboard-product-edit__sidebar-nav--end {
  margin-top: auto;
}

.dashboard-product-edit__logo {
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius-full);
  background-color: var(--primary);
  color: var(--primary-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  text-decoration: none;
}

@media (width >= 768px) {
  .dashboard-product-edit__logo {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

.dashboard-product-edit__logo svg {
  width: 1rem;
  height: 1rem;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-product-edit__logo:hover svg {
  transform: scale(1.1);
}

.dashboard-product-edit__nav-link {
  display: flex;
  width: 2.25rem;
  height: 2.25rem;
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

@media (width >= 768px) {
  .dashboard-product-edit__nav-link {
    width: 2rem;
    height: 2rem;
  }
}

.dashboard-product-edit__nav-link--active {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.dashboard-product-edit__nav-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.dashboard-product-edit__visually-hidden {
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
