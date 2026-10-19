<script setup lang="ts">
import { Avatar } from '@ui/registry/css/ui/avatar';
</script>

<template>
  <div class="example-sigma-ui-avatar-row">
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
        <div class="example-sigma-ui-avatar__text">
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

<style>
@layer components {
  .example-sigma-ui-avatar-row {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--spacing) * 8);
  }

  .example-sigma-ui-avatar__text {
    color: color-mix(in oklch, var(--primary) 50%, transparent);
  }
}
</style>
