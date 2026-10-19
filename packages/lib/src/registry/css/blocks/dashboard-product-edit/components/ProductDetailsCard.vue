<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import { Textarea } from '@ui/registry/css/ui/textarea';
import { Label } from '@ui/registry/css/ui/label';
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
      <div class="dashboard-product-edit__stack">
        <div class="dashboard-product-edit__field">
          <Label for="name">Name</Label>
          <Input
            id="name"
            type="text"
            class="dashboard-product-edit__full-input"
            :model-value="productName"
          />
        </div>
        <div class="dashboard-product-edit__field">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            :model-value="productDescription"
            class="dashboard-product-edit__description"
          />
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

  input.dashboard-product-edit__full-input {
    width: 100%;
  }

  textarea.dashboard-product-edit__description {
    min-height: calc(var(--spacing) * 32);
  }
}
</style>
