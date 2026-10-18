<script setup lang="ts">
import { PlusCircleIcon } from '@lucide/vue';
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Input } from '@ui/registry/css/ui/input';
import { Label } from '@ui/registry/css/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@ui/registry/css/ui/toggle-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/registry/css/ui/table';
import { sizeOptions, stockVariants } from '../data';
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Stock</CardTitle>
      <CardDescription>
        Lipsum dolor sit amet, consectetur adipiscing elit
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="dashboard-product-edit__column-sku">
              SKU
            </TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead class="dashboard-product-edit__column-size">
              Size
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="variant in stockVariants"
            :key="variant.sku"
          >
            <TableCell class="dashboard-product-edit__sku">
              {{ variant.sku }}
            </TableCell>
            <TableCell>
              <Label
                :for="`stock-${variant.id}`"
                class="dashboard-product-edit__visually-hidden"
              >
                Stock
              </Label>
              <Input
                :id="`stock-${variant.id}`"
                type="number"
                :model-value="variant.stock"
              />
            </TableCell>
            <TableCell>
              <Label
                :for="`price-${variant.id}`"
                class="dashboard-product-edit__visually-hidden"
              >
                {{ variant.priceLabel }}
              </Label>
              <Input
                :id="`price-${variant.id}`"
                type="number"
                :model-value="variant.price"
              />
            </TableCell>
            <TableCell>
              <ToggleGroup
                type="single"
                :default-value="variant.defaultSize"
                variant="outline"
              >
                <ToggleGroupItem
                  v-for="size in sizeOptions"
                  :key="size.value"
                  :value="size.value"
                >
                  {{ size.label }}
                </ToggleGroupItem>
              </ToggleGroup>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter class="dashboard-product-edit__stock-footer">
      <Button
        size="sm"
        variant="ghost"
        class="dashboard-product-edit__add-variant"
      >
        <PlusCircleIcon />
        Add Variant
      </Button>
    </CardFooter>
  </Card>
</template>

<style>
.dashboard-product-edit__column-sku,
.dashboard-product-edit__column-size {
  width: 100px;
}

.dashboard-product-edit__sku {
  font-weight: 600;
}

.sigma-ui-card__footer.dashboard-product-edit__stock-footer {
  justify-content: center;
  padding: calc(var(--spacing) * 4);
  border-top: 1px solid var(--border);
}

button.dashboard-product-edit__add-variant {
  gap: calc(var(--spacing) * 1);
}

button.dashboard-product-edit__add-variant svg {
  width: calc(var(--spacing) * 3.5);
  height: calc(var(--spacing) * 3.5);
}

.dashboard-product-edit__visually-hidden {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  border-width: 0;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
