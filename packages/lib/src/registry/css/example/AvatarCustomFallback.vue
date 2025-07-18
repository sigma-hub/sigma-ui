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
.example-sigma-ui-avatar-group {
  display: flex;
  gap: 1rem;
}

.example-sigma-ui-avatar__text {
  color: hsl(var(--primary) / 50%);
}
</style>
