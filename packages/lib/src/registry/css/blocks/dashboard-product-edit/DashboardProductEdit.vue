<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import ArchiveProductCard from './components/ArchiveProductCard.vue';
import ProductCategoryCard from './components/ProductCategoryCard.vue';
import ProductDetailsCard from './components/ProductDetailsCard.vue';
import ProductImagesCard from './components/ProductImagesCard.vue';
import ProductStatusCard from './components/ProductStatusCard.vue';
import ProductStockCard from './components/ProductStockCard.vue';
import ProductToolbar from './components/ProductToolbar.vue';
</script>

<template>
  <div class="dashboard-product-edit">
    <AppSidebar />
    <div class="dashboard-product-edit__content">
      <AppHeader />
      <main class="dashboard-product-edit__main">
        <div class="dashboard-product-edit__panel">
          <ProductToolbar />
          <div class="dashboard-product-edit__columns">
            <div class="dashboard-product-edit__primary">
              <ProductDetailsCard />
              <ProductStockCard />
              <ProductCategoryCard />
            </div>
            <div class="dashboard-product-edit__secondary">
              <ProductStatusCard />
              <ProductImagesCard />
              <ArchiveProductCard />
            </div>
          </div>
          <div class="dashboard-product-edit__mobile-actions">
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
      </main>
    </div>
  </div>
</template>

<style>
.dashboard-product-edit {
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  background-color: color-mix(in oklch, var(--muted) 40%, transparent);
}

.dashboard-product-edit__content {
  display: flex;
  flex-direction: column;
}

@media (width >= 40rem) {
  .dashboard-product-edit__content {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3.5rem;
    gap: 1rem;
  }
}

.dashboard-product-edit__main {
  display: grid;
  flex: 1 1 0%;
  align-items: start;
  padding: 1rem;
  gap: 1rem;
}

@media (width >= 40rem) {
  .dashboard-product-edit__main {
    padding: 0 1.5rem;
  }
}

@media (width >= 48rem) {
  .dashboard-product-edit__main {
    gap: 2rem;
  }
}

.dashboard-product-edit__panel {
  display: grid;
  width: 100%;
  max-width: 59rem;
  flex: 1 1 0%;
  margin-right: auto;
  margin-left: auto;
  gap: 1rem;
  grid-auto-rows: max-content;
}

.dashboard-product-edit__columns {
  display: grid;
  gap: 1rem;
}

@media (width >= 48rem) {
  .dashboard-product-edit__columns {
    grid-template-columns: 1fr 250px;
  }
}

@media (width >= 64rem) {
  .dashboard-product-edit__columns {
    gap: 2rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.dashboard-product-edit__primary,
.dashboard-product-edit__secondary {
  display: grid;
  align-items: start;
  gap: 1rem;
  grid-auto-rows: max-content;
}

@media (width >= 64rem) {
  .dashboard-product-edit__primary {
    gap: 2rem;
    grid-column: span 2 / span 2;
  }

  .dashboard-product-edit__secondary {
    gap: 2rem;
  }
}

.dashboard-product-edit__mobile-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

@media (width >= 48rem) {
  .dashboard-product-edit__mobile-actions {
    display: none;
  }
}
</style>
