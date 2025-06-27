<script setup lang="ts">
import { Input } from '@ui/registry/tailwind/ui/input';
import { Button } from '@ui/registry/tailwind/ui/button';
</script>

<template>
  <div class="flex w-full max-w-sm gap-2">
    <Input
      id="email"
      type="email"
      placeholder="Email"
    />
    <Button type="submit">
      Subscribe
    </Button>
  </div>
</template>
