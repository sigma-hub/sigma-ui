<script setup lang="ts">
import { Separator } from '@ui/registry/css/ui/separator';
</script>

<template>
  <div>
    <div class="example-sigma-ui-separator__header">
      <h4 class="example-sigma-ui-separator__title">
        Reka Primitives
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
@layer base, components;

@layer components {
  .example-sigma-ui-separator__header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
  }

  .example-sigma-ui-separator__title {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1;
  }

  .example-sigma-ui-separator__description {
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  .example-sigma-ui-separator__divider {
    margin: calc(var(--spacing) * 4) 0;
  }

  .example-sigma-ui-separator__nav {
    display: flex;
    height: calc(var(--spacing) * 5);
    align-items: center;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 4);
  }
}
</style>
