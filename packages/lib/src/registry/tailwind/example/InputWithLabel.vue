<script setup lang="ts">
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
</script>

<template>
  <div class="flex flex-col w-full max-w-sm gap-2">
    <Label for="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="Email"
    />
  </div>
</template>
