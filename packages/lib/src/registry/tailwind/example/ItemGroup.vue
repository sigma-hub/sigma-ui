<script setup lang="ts">
import { BellIcon, UserIcon } from '@lucide/vue';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from '@ui/registry/tailwind/ui/item';
</script>

<template>
  <ItemGroup class="w-full max-w-md">
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
