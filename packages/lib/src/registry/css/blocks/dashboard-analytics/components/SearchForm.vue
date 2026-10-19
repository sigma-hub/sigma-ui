<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
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
@layer components {
  .dashboard-analytics__search {
    flex: 1 1 0%;
    margin-left: auto;
  }

  .dashboard-analytics__search-field {
    position: relative;
  }

  .dashboard-analytics__search-icon {
    position: absolute;
    top: calc(var(--spacing) * 2.5);
    left: calc(var(--spacing) * 2.5);
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    color: var(--muted-foreground);
  }

  .dashboard-analytics__search-input.dashboard-analytics__search-input {
    padding-left: calc(var(--spacing) * 8);
  }

  @media (width >= 40rem) {
    .dashboard-analytics__search {
      flex: 0 1 auto;
    }

    .dashboard-analytics__search-input.dashboard-analytics__search-input {
      width: 300px;
    }
  }

  @media (width >= 48rem) {
    .dashboard-analytics__search-input.dashboard-analytics__search-input {
      width: 200px;
    }
  }

  @media (width >= 64rem) {
    .dashboard-analytics__search-input.dashboard-analytics__search-input {
      width: 300px;
    }
  }
}
</style>
