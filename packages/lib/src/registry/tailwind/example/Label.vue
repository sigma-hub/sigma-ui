<script setup lang="ts">
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';
import { Label } from '@ui/registry/tailwind/ui/label';
</script>

<template>
  <div>
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
  </div>
</template>
