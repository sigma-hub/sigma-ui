<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Input } from '@ui/registry/css/ui/input';

defineProps<{
  placeholder: string;
}>();
</script>

<template>
  <form class="dashboard-analytics__search">
    <div class="dashboard-analytics__search-field">
      <SearchIcon class="dashboard-analytics__search-icon" />
      <Input
        type="search"
        :placeholder="placeholder"
        class="dashboard-analytics__search-input"
      />
    </div>
  </form>
</template>

<style>
.dashboard-analytics__search {
  flex: 1 1 0%;
  margin-left: auto;
}

.dashboard-analytics__search-field {
  position: relative;
}

.dashboard-analytics__search-icon {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}

.dashboard-analytics__search-input.dashboard-analytics__search-input {
  padding-left: 2rem;
}

@media (width >= 640px) {
  .dashboard-analytics__search {
    flex: 0 1 auto;
  }

  .dashboard-analytics__search-input.dashboard-analytics__search-input {
    width: 300px;
  }
}

@media (width >= 768px) {
  .dashboard-analytics__search-input.dashboard-analytics__search-input {
    width: 200px;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__search-input.dashboard-analytics__search-input {
    width: 300px;
  }
}
</style>
