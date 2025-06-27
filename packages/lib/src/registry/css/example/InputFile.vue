<script setup lang="ts">
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <div class="example-sigma-ui-input-file">
    <Label for="picture">Picture</Label>
    <Input
      id="picture"
      type="file"
    />
  </div>
</template>

<style>
.example-sigma-ui-input-file {
  display: flex;
  flex-direction: column;
  max-width: 24rem;
  gap: 0.5rem;
}
</style>
