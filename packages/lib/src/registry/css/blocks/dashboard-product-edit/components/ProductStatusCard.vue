<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Label } from '@ui/registry/css/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/css/ui/select';
import { statusOptions } from '../data';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Product Status</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="dashboard-product-edit__stack">
        <div class="dashboard-product-edit__field">
          <Label for="status">Status</Label>
          <Select>
            <SelectTrigger
              id="status"
              aria-label="Select status"
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-product-edit__stack {
    display: grid;
    gap: calc(var(--spacing) * 6);
  }

  .dashboard-product-edit__field {
    display: grid;
    gap: calc(var(--spacing) * 3);
  }
}
</style>
