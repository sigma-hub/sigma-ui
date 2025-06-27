<script setup lang="ts">
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
</script>

<template>
  <div class="flex gap-4">
    <Avatar>
      <template #fallback>
        <div class="text-primary/50">
          YU
        </div>
      </template>
    </Avatar>

    <Avatar />
  </div>
</template>
