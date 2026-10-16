<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Textarea } from '@ui/registry/tailwind/ui/textarea';
import { Label } from '@ui/registry/tailwind/ui/label';
import { productDescription, productName } from '../data';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Product Details</CardTitle>
      <CardDescription>
        Lipsum dolor sit amet, consectetur adipiscing elit
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6">
        <div class="grid gap-3">
          <Label for="name">Name</Label>
          <Input
            id="name"
            type="text"
            class="w-full"
            :model-value="productName"
          />
        </div>
        <div class="grid gap-3">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            :model-value="productDescription"
            class="min-h-32"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
