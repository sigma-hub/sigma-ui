<script setup lang="ts">
import { ChevronLeftIcon } from 'lucide-vue-next';
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
  gap: 1rem;
}

button.dashboard-product-edit__back-button {
  width: 1.75rem;
  height: 1.75rem;
}

button.dashboard-product-edit__back-button svg {
  width: 1rem;
  height: 1rem;
}

.dashboard-product-edit__product-title {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0%;
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

@media (width >= 640px) {
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
  gap: 0.5rem;
}

@media (width >= 768px) {
  .dashboard-product-edit__toolbar-actions {
    display: flex;
    margin-left: auto;
  }
}

.dashboard-product-edit__visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
