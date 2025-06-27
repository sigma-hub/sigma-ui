<script setup lang="ts">
import { Separator } from '@ui/registry/css/ui/separator';
</script>

<template>
  <div>
    <div class="example-sigma-ui-separator__header">
      <h4 class="example-sigma-ui-separator__title">
        Radix Primitives
      </h4>
      <p class="example-sigma-ui-separator__description">
        An open-source UI component library.
      </p>
    </div>
    <Separator
      class="example-sigma-ui-separator__divider"
      label="Or"
    />
    <div class="example-sigma-ui-separator__nav">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
</template>

<style>
.example-sigma-ui-separator__header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.example-sigma-ui-separator__title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.example-sigma-ui-separator__description {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
}

.example-sigma-ui-separator__divider {
  margin: 1rem 0;
}

.example-sigma-ui-separator__nav {
  display: flex;
  height: 1.25rem;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}
</style>
