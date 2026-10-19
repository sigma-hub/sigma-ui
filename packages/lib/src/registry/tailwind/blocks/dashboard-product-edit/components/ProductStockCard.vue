<script setup lang="ts">
import { PlusCircleIcon } from '@lucide/vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Input } from '@ui/registry/tailwind/ui/input';
import { Label } from '@ui/registry/tailwind/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@ui/registry/tailwind/ui/toggle-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/registry/tailwind/ui/table';
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
            <TableHead class="w-[100px]">
              SKU
            </TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead class="w-[100px]">
              Size
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="variant in stockVariants"
            :key="variant.sku"
          >
            <TableCell class="font-semibold">
              {{ variant.sku }}
            </TableCell>
            <TableCell>
              <Label
                :for="`stock-${variant.id}`"
                class="sr-only"
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
                class="sr-only"
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
    <CardFooter class="justify-center border-t p-4">
      <Button
        size="sm"
        variant="ghost"
        class="gap-1"
      >
        <PlusCircleIcon class="h-3.5 w-3.5" />
        Add Variant
      </Button>
    </CardFooter>
  </Card>
</template>
