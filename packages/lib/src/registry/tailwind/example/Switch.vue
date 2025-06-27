<script setup lang="ts">
import { Label } from '@ui/registry/tailwind/ui/label';
import { Switch } from '@ui/registry/tailwind/ui/switch';
</script>

<template>
  <div class="flex items-center space-x-2">
    <Switch id="airplane-mode" />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>
