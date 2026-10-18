<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Input } from '@ui/registry/css/ui/input';

defineProps<{
  placeholder: string;
}>();
</script>

<template>
  <form class="dashboard-settings__search">
    <div class="dashboard-settings__search-field">
      <SearchIcon class="dashboard-settings__search-icon" />
      <Input
        type="search"
        :placeholder="placeholder"
        class="dashboard-settings__search-input"
      />
    </div>
  </form>
</template>

<style>
.dashboard-settings__search {
  flex: 1 1 0%;
  margin-left: auto;
}

.dashboard-settings__search-field {
  position: relative;
}

.dashboard-settings__search-icon {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}

.dashboard-settings__search-input.dashboard-settings__search-input {
  padding-left: 2rem;
}

@media (width >= 40rem) {
  .dashboard-settings__search {
    flex: 0 1 auto;
  }

  .dashboard-settings__search-input.dashboard-settings__search-input {
    width: 300px;
  }
}

@media (width >= 48rem) {
  .dashboard-settings__search-input.dashboard-settings__search-input {
    width: 200px;
  }
}

@media (width >= 64rem) {
  .dashboard-settings__search-input.dashboard-settings__search-input {
    width: 300px;
  }
}
</style>
