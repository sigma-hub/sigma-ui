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
.mail-inbox__nav {
  display: grid;
  gap: 0.25rem;
  padding: 0.5rem;
}

.mail-inbox__nav--collapsed {
  justify-items: center;
}

.mail-inbox__nav-link {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--radius);
  padding: 0.375rem 0.75rem;
  color: var(--foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-decoration: none;
}

.mail-inbox__nav-link:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.mail-inbox__nav-link--icon {
  width: 2.25rem;
  height: 2.25rem;
  justify-content: center;
  padding: 0;
}

.mail-inbox__nav-link--active,
.mail-inbox__nav-link--active:hover {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.mail-inbox__icon {
  width: 1rem;
  height: 1rem;
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
  gap: 1rem;
}

.mail-inbox__tooltip-count {
  color: var(--muted-foreground);
}

.mail-inbox__sr-only {
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
