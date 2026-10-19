<script setup lang="ts">
import { Avatar } from '@ui/registry/css/ui/avatar';
</script>

<template>
  <div class="example-sigma-ui-avatar-group">
    <Avatar>
      <template #fallback>
        <div class="example-sigma-ui-avatar__text">
          YU
        </div>
      </template>
    </Avatar>

    <Avatar />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-avatar-group {
    display: flex;
    gap: calc(var(--spacing) * 4);
  }

  .example-sigma-ui-avatar__text {
    color: color-mix(in oklch, var(--primary) 50%, transparent);
  }
}
</style>
