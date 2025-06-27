<script setup lang="ts">
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
</script>

<template>
  <div class="gap-8 hidden sm:flex">
    <Avatar
      src="/avatars/avatar-example@0.25x.png"
      shape="rounded"
      size="base"
    />

    <Avatar
      src="/avatars/avatar-example@0.25x.png"
      shape="circle"
      size="base"
    />

    <Avatar
      shape="circle"
      size="base"
    >
      <template #fallback>
        <div class="text-primary/50">
          YU
        </div>
      </template>
    </Avatar>

    <Avatar
      shape="circle"
      size="base"
    />
  </div>
</template>
