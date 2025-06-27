<script setup lang="ts">
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <div class="example-sigma-ui-input-with-label">
    <Label for="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="Email"
    />
  </div>
</template>

<style>
.example-sigma-ui-input-with-label {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
