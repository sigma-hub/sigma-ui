<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/registry/tailwind/ui/select';
import { roleOptions } from '../data';
</script>

<template>
  <Select default-value="system">
    <SelectTrigger>
      <SelectValue placeholder="Select a role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="role in roleOptions"
        :key="role.value"
        :value="role.value"
      >
        {{ role.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
