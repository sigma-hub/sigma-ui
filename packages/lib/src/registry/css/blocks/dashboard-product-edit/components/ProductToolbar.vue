<script setup lang="ts">
import { ChevronLeftIcon } from '@lucide/vue';
import { Badge } from '@ui/registry/css/ui/badge';
import { Button } from '@ui/registry/css/ui/button';
</script>

<template>
  <div class="dashboard-product-edit__toolbar">
    <Button
      variant="outline"
      size="icon"
      class="dashboard-product-edit__back-button"
    >
      <ChevronLeftIcon />
      <span class="dashboard-product-edit__visually-hidden">Back</span>
    </Button>
    <h1 class="dashboard-product-edit__product-title">
      Pro Controller
    </h1>
    <Badge
      variant="outline"
      class="dashboard-product-edit__stock-badge"
    >
      In stock
    </Badge>
    <div class="dashboard-product-edit__toolbar-actions">
      <Button
        variant="outline"
        size="sm"
      >
        Discard
      </Button>
      <Button size="sm">
        Save Product
      </Button>
    </div>
  </div>
</template>

<style>
.dashboard-product-edit__toolbar {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 4);
}

button.dashboard-product-edit__back-button {
  width: calc(var(--spacing) * 7);
  height: calc(var(--spacing) * 7);
}

button.dashboard-product-edit__back-button svg {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}

.dashboard-product-edit__product-title {
  flex: 1 0 0%;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.75rem;
  white-space: nowrap;
}

.dashboard-product-edit__stock-badge {
  margin-left: auto;
}

@media (width >= 40rem) {
  .dashboard-product-edit__product-title {
    flex-grow: 0;
  }

  .dashboard-product-edit__stock-badge {
    margin-left: 0;
  }
}

.dashboard-product-edit__toolbar-actions {
  display: none;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

@media (width >= 48rem) {
  .dashboard-product-edit__toolbar-actions {
    display: flex;
    margin-left: auto;
  }
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
