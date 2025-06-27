<script setup lang="ts">
import { Label } from '@ui/registry/css/ui/label';
import { RadioGroup, RadioGroupItem } from '@ui/registry/css/ui/radio-group';
</script>

<template>
  <RadioGroup default-value="comfortable">
    <div class="example-sigma-ui-radio-group__item">
      <RadioGroupItem
        id="r1"
        value="default"
      />
      <Label for="r1">Default</Label>
    </div>
    <div class="example-sigma-ui-radio-group__item">
      <RadioGroupItem
        id="r2"
        value="comfortable"
      />
      <Label for="r2">Comfortable</Label>
    </div>
    <div class="example-sigma-ui-radio-group__item">
      <RadioGroupItem
        id="r3"
        value="compact"
      />
      <Label for="r3">Compact</Label>
    </div>
  </RadioGroup>
</template>

<style>
.example-sigma-ui-radio-group__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
