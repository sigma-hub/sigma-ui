<script setup lang="ts">
import { Checkbox } from '@ui/registry/css/ui/checkbox';
import { Label } from '@ui/registry/css/ui/label';
</script>

<template>
  <div>
    <div class="example-sigma-ui-label">
      <Checkbox id="terms" />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
  </div>
</template>

<style>
.example-sigma-ui-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
