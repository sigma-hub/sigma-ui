<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
import { Input } from '@ui/registry/css/ui/input';

defineProps<{
  placeholder: string;
}>();
</script>

<template>
  <div class="dashboard-sidebar__search">
    <form>
      <div class="dashboard-sidebar__search-field">
        <SearchIcon class="dashboard-sidebar__search-icon" />
        <Input
          type="search"
          :placeholder="placeholder"
          class="dashboard-sidebar__search-input"
        />
      </div>
    </form>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-sidebar__search {
    width: 100%;
    flex: 1 1 0%;
  }

  .dashboard-sidebar__search-field {
    position: relative;
  }

  .dashboard-sidebar__search-icon {
    position: absolute;
    top: calc(var(--spacing) * 2.5);
    left: calc(var(--spacing) * 2.5);
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
  }

  .dashboard-sidebar__search-input.dashboard-sidebar__search-input {
    width: 100%;
    padding-left: calc(var(--spacing) * 8);
    appearance: none;
    background-color: var(--background);
    box-shadow: none;
  }

  @media (width >= 48rem) {
    .dashboard-sidebar__search-input.dashboard-sidebar__search-input {
      width: 66.6667%;
    }
  }

  @media (width >= 64rem) {
    .dashboard-sidebar__search-input.dashboard-sidebar__search-input {
      width: 33.3333%;
    }
  }
}
</style>
