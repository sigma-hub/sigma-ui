<script setup lang="ts">
import { BellIcon, UserIcon } from '@lucide/vue';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@ui/registry/css/ui/item';
</script>

<template>
  <ItemGroup class="example-item-group">
    <Item
      variant="outline"
      size="sm"
    >
      <ItemMedia variant="icon">
        <UserIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Profile</ItemTitle>
        <ItemDescription>Name, photo, and contact details.</ItemDescription>
      </ItemContent>
    </Item>
    <ItemSeparator />
    <Item
      variant="outline"
      size="sm"
    >
      <ItemMedia variant="icon">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>Choose what you hear about.</ItemDescription>
      </ItemContent>
    </Item>
  </ItemGroup>
</template>

<style>
@layer base, components;

@layer components {
  .example-item-group {
    width: 100%;
    max-width: 28rem;
  }
}
</style>
