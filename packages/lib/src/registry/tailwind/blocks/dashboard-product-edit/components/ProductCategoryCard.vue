<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Label } from '@ui/registry/tailwind/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/registry/tailwind/ui/select';
import { categoryOptions, subcategoryOptions } from '../data';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Product Category</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6 sm:grid-cols-3">
        <div class="grid gap-3">
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
        <div class="grid gap-3">
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
