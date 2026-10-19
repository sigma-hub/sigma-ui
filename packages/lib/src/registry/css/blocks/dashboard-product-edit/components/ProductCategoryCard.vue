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
import { categoryOptions, subcategoryOptions } from '../data';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Product Category</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="dashboard-product-edit__category-grid">
        <div class="dashboard-product-edit__field">
          <Label for="category">Category</Label>
          <Select>
            <SelectTrigger
              id="category"
              aria-label="Select category"
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in categoryOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="dashboard-product-edit__field">
          <Label for="subcategory">
            Subcategory (optional)
          </Label>
          <Select>
            <SelectTrigger
              id="subcategory"
              aria-label="Select subcategory"
            >
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="option in subcategoryOptions"
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
@layer components {
  .dashboard-product-edit__category-grid {
    display: grid;
    gap: calc(var(--spacing) * 6);
  }

  @media (width >= 40rem) {
    .dashboard-product-edit__category-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .dashboard-product-edit__field {
    display: grid;
    gap: calc(var(--spacing) * 3);
  }
}
</style>
