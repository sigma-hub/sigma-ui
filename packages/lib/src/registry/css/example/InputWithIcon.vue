<script setup lang="ts">
import { SearchIcon } from '@lucide/vue';
import { Input } from '@ui/registry/css/ui/input';
</script>

<template>
  <div class="example-sigma-ui-input-with-icon">
    <Input
      id="search"
      type="text"
      placeholder="Search..."
      class="example-sigma-ui-input-with-icon__input"
    />
    <span class="example-sigma-ui-input-with-icon__icon-wrapper">
      <SearchIcon class="example-sigma-ui-input-with-icon__icon" />
    </span>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-input-with-icon {
    position: relative;
    width: 100%;
    max-width: 24rem;
  }

  .example-sigma-ui-input-with-icon__input {
    padding-left: calc(var(--spacing) * 10);
  }

  .example-sigma-ui-input-with-icon__icon-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 calc(var(--spacing) * 2);
  }

  .example-sigma-ui-input-with-icon__icon {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
    color: var(--muted-foreground);
  }
}
</style>
