<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/tailwind/ui/popover';
import { Button } from '@ui/registry/tailwind/ui/button';
import { Label } from '@ui/registry/tailwind/ui/label';
import { Input } from '@ui/registry/tailwind/ui/input';
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        Open popover
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">
            Dimensions
          </h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="width">Width</Label>
            <Input
              id="width"
              type="text"
              model-value="100%"
              class="col-span-2 h-8"
            />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="maxWidth">Max. width</Label>
            <Input
              id="maxWidth"
              type="text"
              model-value="300px"
              class="col-span-2 h-8"
            />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="height">Height</Label>
            <Input
              id="height"
              type="text"
              model-value="25px"
              class="col-span-2 h-8"
            />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label for="maxHeight">Max. height</Label>
            <Input
              id="maxHeight"
              type="text"
              model-value="none"
              class="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
