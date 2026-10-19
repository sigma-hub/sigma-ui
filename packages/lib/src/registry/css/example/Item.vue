<script setup lang="ts">
import { ShieldIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@ui/registry/css/ui/item';
</script>

<template>
  <Item
    variant="outline"
    class="example-item"
  >
    <ItemMedia variant="icon">
      <ShieldIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Security</ItemTitle>
      <ItemDescription>Manage how you sign in and which devices stay trusted.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button
        variant="outline"
        size="sm"
      >
        Manage
      </Button>
    </ItemActions>
  </Item>
</template>

<style>
@layer base, components;

@layer components {
  .example-item {
    width: 100%;
    max-width: 28rem;
  }
}
</style>
