<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
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
.example-sigma-ui-input-with-icon {
  position: relative;
  width: 100%;
  max-width: 24rem;
}

.example-sigma-ui-input-with-icon__input {
  padding-left: 2.5rem;
}

.example-sigma-ui-input-with-icon__icon-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
}

.example-sigma-ui-input-with-icon__icon {
  width: 1.5rem;
  height: 1.5rem;
  color: hsl(var(--muted-foreground));
}
</style>
