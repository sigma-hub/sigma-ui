<script setup lang="ts">
import { Input } from '@ui/registry/css/ui/input';
import { Button } from '@ui/registry/css/ui/button';
</script>

<template>
  <div class="example-sigma-ui-input-with-button">
    <Input
      id="email"
      autocomplete="email"
      type="email"
      placeholder="Email"
    />
    <Button type="submit">
      Subscribe
    </Button>
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-input-with-button {
    display: flex;
    width: 100%;
    gap: calc(var(--spacing) * 2);
  }
}
</style>
