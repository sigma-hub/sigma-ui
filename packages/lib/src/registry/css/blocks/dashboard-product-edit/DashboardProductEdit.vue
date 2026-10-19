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
@layer components {
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
      padding-top: calc(var(--spacing) * 4);
      padding-bottom: calc(var(--spacing) * 4);
      padding-left: calc(var(--spacing) * 14);
      gap: calc(var(--spacing) * 4);
    }
  }

  .dashboard-product-edit__main {
    display: grid;
    flex: 1 1 0%;
    align-items: start;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 4);
  }

  @media (width >= 40rem) {
    .dashboard-product-edit__main {
      padding: 0 calc(var(--spacing) * 6);
    }
  }

  @media (width >= 48rem) {
    .dashboard-product-edit__main {
      gap: calc(var(--spacing) * 8);
    }
  }

  .dashboard-product-edit__panel {
    display: grid;
    width: 100%;
    max-width: calc(var(--spacing) * 236);
    flex: 1 1 0%;
    margin-right: auto;
    margin-left: auto;
    gap: calc(var(--spacing) * 4);
    grid-auto-rows: max-content;
  }

  .dashboard-product-edit__columns {
    display: grid;
    gap: calc(var(--spacing) * 4);
  }

  @media (width >= 48rem) {
    .dashboard-product-edit__columns {
      grid-template-columns: 1fr 250px;
    }
  }

  @media (width >= 64rem) {
    .dashboard-product-edit__columns {
      gap: calc(var(--spacing) * 8);
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .dashboard-product-edit__primary,
  .dashboard-product-edit__secondary {
    display: grid;
    align-items: start;
    gap: calc(var(--spacing) * 4);
    grid-auto-rows: max-content;
  }

  @media (width >= 64rem) {
    .dashboard-product-edit__primary {
      gap: calc(var(--spacing) * 8);
      grid-column: span 2 / span 2;
    }

    .dashboard-product-edit__secondary {
      gap: calc(var(--spacing) * 8);
    }
  }

  .dashboard-product-edit__mobile-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--spacing) * 2);
  }

  @media (width >= 48rem) {
    .dashboard-product-edit__mobile-actions {
      display: none;
    }
  }
}
</style>
