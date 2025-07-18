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
  max-width: 24rem;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
