<script setup lang="ts">
import { useSidebar } from './utils';

const { toggleSidebar } = useSidebar();
</script>

<template>
  <button
    type="button"
    data-sidebar="rail"
    data-slot="sidebar-rail"
    aria-label="Toggle Sidebar"
    title="Toggle Sidebar"
    :tabindex="-1"
    class="sigma-ui-sidebar-rail"
    @click="toggleSidebar"
  >
    <slot />
  </button>
</template>

<style>
.sigma-ui-sidebar-rail {
  position: absolute;
  z-index: 20;
  display: none;
  width: 1rem;
  padding: 0;
  border: none;
  background-color: transparent;
  inset-block: 0;
  transform: translateX(-50%);
  transition: all 150ms linear;
}

.sigma-ui-sidebar-rail::after {
  position: absolute;
  left: 50%;
  width: 2px;
  content: "";
  inset-block: 0;
}

.sigma-ui-sidebar-rail:hover::after {
  background-color: var(--border);
}

.sigma-ui-sidebar[data-side="left"] .sigma-ui-sidebar-rail {
  right: -1rem;
  cursor: w-resize;
}

.sigma-ui-sidebar[data-side="right"] .sigma-ui-sidebar-rail {
  left: 0;
  cursor: e-resize;
}

.sigma-ui-sidebar[data-side="left"][data-state="collapsed"] .sigma-ui-sidebar-rail {
  cursor: e-resize;
}

.sigma-ui-sidebar[data-side="right"][data-state="collapsed"] .sigma-ui-sidebar-rail {
  cursor: w-resize;
}

.sigma-ui-sidebar[data-collapsible="offcanvas"] .sigma-ui-sidebar-rail {
  transform: translateX(0);
}

.sigma-ui-sidebar[data-collapsible="offcanvas"] .sigma-ui-sidebar-rail::after {
  left: 100%;
}

.sigma-ui-sidebar[data-collapsible="offcanvas"] .sigma-ui-sidebar-rail:hover {
  background-color: var(--background);
}

.sigma-ui-sidebar[data-side="left"][data-collapsible="offcanvas"] .sigma-ui-sidebar-rail {
  right: -0.5rem;
}

.sigma-ui-sidebar[data-side="right"][data-collapsible="offcanvas"] .sigma-ui-sidebar-rail {
  left: -0.5rem;
}

@media (width >= 640px) {
  .sigma-ui-sidebar-rail {
    display: flex;
  }
}
</style>
