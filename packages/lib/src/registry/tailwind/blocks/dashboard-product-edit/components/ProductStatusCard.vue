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
import { statusOptions } from '../data';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Product Status</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6">
        <div class="grid gap-3">
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
