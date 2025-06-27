<script setup lang="ts">
import { Label } from '@ui/registry/css/ui/label';
import { Switch } from '@ui/registry/css/ui/switch';
</script>

<template>
  <div class="example-sigma-ui-switch">
    <Switch id="airplane-mode" />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>

<style>
.example-sigma-ui-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
