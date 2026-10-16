<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
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
.dashboard-sidebar__search {
  width: 100%;
  flex: 1 1 0%;
}

.dashboard-sidebar__search-field {
  position: relative;
}

.dashboard-sidebar__search-icon {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}

.dashboard-sidebar__search-input.dashboard-sidebar__search-input {
  width: 100%;
  padding-left: 2rem;
  background-color: var(--background);
  box-shadow: none;
  appearance: none;
}

@media (width >= 768px) {
  .dashboard-sidebar__search-input.dashboard-sidebar__search-input {
    width: 66.666667%;
  }
}

@media (width >= 1024px) {
  .dashboard-sidebar__search-input.dashboard-sidebar__search-input {
    width: 33.333333%;
  }
}
</style>
