<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/registry/css/ui/popover';
import { Button } from '@ui/registry/css/ui/button';
import { Label } from '@ui/registry/css/ui/label';
import { Input } from '@ui/registry/css/ui/input';
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        Open popover
      </Button>
    </PopoverTrigger>
    <PopoverContent class="example-sigma-ui-popover__content">
      <div class="example-sigma-ui-popover__container">
        <div class="example-sigma-ui-popover__header">
          <h4 class="example-sigma-ui-popover__title">
            Dimensions
          </h4>
          <p class="example-sigma-ui-popover__description">
            Set the dimensions for the layer.
          </p>
        </div>
        <div class="example-sigma-ui-popover__form">
          <div class="example-sigma-ui-popover__form-row">
            <Label for="width">Width</Label>
            <Input
              id="width"
              type="text"
              model-value="100%"
              class="example-sigma-ui-popover__input"
            />
          </div>
          <div class="example-sigma-ui-popover__form-row">
            <Label for="maxWidth">Max. width</Label>
            <Input
              id="maxWidth"
              type="text"
              model-value="300px"
              class="example-sigma-ui-popover__input"
            />
          </div>
          <div class="example-sigma-ui-popover__form-row">
            <Label for="height">Height</Label>
            <Input
              id="height"
              type="text"
              model-value="25px"
              class="example-sigma-ui-popover__input"
            />
          </div>
          <div class="example-sigma-ui-popover__form-row">
            <Label for="maxHeight">Max. height</Label>
            <Input
              id="maxHeight"
              type="text"
              model-value="none"
              class="example-sigma-ui-popover__input"
            />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style>
.example-sigma-ui-popover__content {
  width: 20rem;
}

.example-sigma-ui-popover__container {
  display: grid;
  gap: 1rem;
}

.example-sigma-ui-popover__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-sigma-ui-popover__title {
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-popover__description {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}

.example-sigma-ui-popover__form {
  display: grid;
  gap: 0.5rem;
}

.example-sigma-ui-popover__form-row {
  display: grid;
  align-items: center;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.example-sigma-ui-popover__input {
  height: 2rem;
  grid-column: span 2;
}
</style>
